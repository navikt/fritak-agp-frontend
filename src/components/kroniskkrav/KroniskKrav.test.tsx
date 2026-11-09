import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';

import KroniskKrav from './KroniskKrav';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import testFnr from '../../mockData/testFnr';
import testOrganisasjon from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Locales from '../../locale/Locales';
import buildResources from '../../locale/buildResources';
import { LanguageProvider } from '../../context/language/LanguageContext';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import { vi } from 'vitest';
import KroniskKravState, { defaultKroniskKravState } from './KroniskKravState';
import postKroniskKrav from '../../api/kroniskkrav/postKroniskKrav';
import patchKroniskKrav from '../../api/kroniskkrav/patchKroniskKrav';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import { parseDato } from '../../utils/dato/Dato';
import { EndringsAarsak } from '../gravidkrav/EndringsAarsak';
import HttpStatus from '../../api/HttpStatus';
import { ValidationResponse } from '../../state/validation/ValidationResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';

vi.mock('../../api/kroniskkrav/postKroniskKrav');
vi.mock('../../api/kroniskkrav/patchKroniskKrav');
vi.mock('../../api/grunnbelop/getGrunnbeloep', () => ({ default: vi.fn(async () => ({ status: 200 })) }));

const arbeidsgivere: Organisasjon[] = testOrganisasjon;
vi.unmock('react-i18next');

describe('KroniskKrav', () => {
  beforeAll(async () => {
    if (!i18next.isInitialized) {
      await i18next.use(initReactI18next).init({
        resources: buildResources(Locales),
        lng: 'nb',
        react: { useSuspense: false }
      });
    }
  });
  const user = userEvent.setup();

  describe('submission', () => {
    const validState = (overrides: Partial<KroniskKravState> = {}) =>
      defaultKroniskKravState({
        feilmeldinger: [],
        fnr: testFnr.GyldigeFraDolly.TestPerson1,
        orgnr: '810008032',
        antallDager: 260,
        bekreft: true,
        perioder: [
          { uniqueKey: 'periode', fom: parseDato('02.08.2021'), tom: parseDato('06.08.2021'), dager: 5, belop: 35000 }
        ],
        ...overrides
      });

    const renderForm = (state: KroniskKravState) => {
      const router = createMemoryRouter(
        [
          {
            path: '/nb/kronisk/krav',
            element: (
              <ArbeidsgiverProvider
                arbeidsgivere={arbeidsgivere}
                status={200}
                arbeidsgiverId='810007842'
                baseUrl='/base/url'
              >
                <KroniskKrav state={state} />
              </ArbeidsgiverProvider>
            )
          },
          { path: '/nb/kronisk/krav/kvittering', element: <div>Receipt</div> }
        ],
        { initialEntries: ['/nb/kronisk/krav'] }
      );
      render(<RouterProvider router={router} />);
      return router;
    };

    beforeEach(() => {
      vi.mocked(postKroniskKrav).mockReset();
      vi.mocked(patchKroniskKrav).mockReset();
      vi.mocked(getGrunnbeloep).mockResolvedValue({ status: HttpStatus.Successfully });
    });

    it.each([false, true])('sends the validated request with endringskrav=%s', async (endringskrav) => {
      const api = endringskrav ? vi.mocked(patchKroniskKrav) : vi.mocked(postKroniskKrav);
      api.mockResolvedValue({ status: HttpStatus.Created, violations: [] });
      const router = renderForm(validState({ endringskrav, kravId: 'krav-id', endringsAarsak: EndringsAarsak.ANNET }));

      fireEvent.click(screen.getByRole('button', { name: endringskrav ? /Send inn endring/ : /Send kravet/ }));

      await waitFor(() => expect(router.state.location.pathname).toBe('/nb/kronisk/krav/kvittering'));
      expect(api).toHaveBeenCalledTimes(1);
      const expectedRequest = {
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1,
        virksomhetsnummer: '810008032',
        antallDager: 260,
        bekreftet: true,
        perioder: [
          { fom: '2021-08-02', tom: '2021-08-06', antallDagerMedRefusjon: 5, månedsinntekt: 35000, gradering: 1 }
        ],
        ...(endringskrav ? { aarsakEndring: EndringsAarsak.ANNET } : {})
      };
      expect(api.mock.calls[0].at(-1)).toEqual(expectedRequest);
      if (endringskrav) expect(vi.mocked(patchKroniskKrav).mock.calls[0][1]).toBe('krav-id');
      expect(endringskrav ? postKroniskKrav : patchKroniskKrav).not.toHaveBeenCalled();
      router.dispose();
    });

    it('does not send an invalid form and revalidates corrected fields', async () => {
      const router = renderForm(validState({ fnr: '123' }));
      fireEvent.click(screen.getByRole('button', { name: /Send kravet/ }));
      expect(postKroniskKrav).not.toHaveBeenCalled();
      expect(screen.getAllByText(/Ugyldig fødselsnummer/).length).toBeGreaterThan(0);
      fireEvent.change(screen.getByLabelText(/Fødselsnummer/), {
        target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
      });
      expect(screen.queryByText(/Ugyldig fødselsnummer/)).not.toBeInTheDocument();
      router.dispose();
    });

    it('does not start a request from submission flags alone', async () => {
      const router = renderForm(validState({ validated: true, progress: true }));
      await act(async () => {});
      expect(postKroniskKrav).not.toHaveBeenCalled();
      router.dispose();
    });

    it('sends only once during rapid clicks, field edits and a grunnbelop update', async () => {
      let finishRequest!: (response: ValidationResponse<KroniskKravResponse>) => void;
      vi.mocked(postKroniskKrav).mockReturnValue(
        new Promise((resolve) => {
          finishRequest = resolve;
        })
      );
      let finishGrunnbelop!: (response: Awaited<ReturnType<typeof getGrunnbeloep>>) => void;
      vi.mocked(getGrunnbeloep).mockReturnValue(
        new Promise((resolve) => {
          finishGrunnbelop = resolve;
        })
      );
      const router = renderForm(validState());
      const submit = screen.getByRole('button', { name: /Send kravet/ });
      act(() => {
        fireEvent.click(submit);
        fireEvent.click(submit);
      });
      fireEvent.change(screen.getByLabelText(/Beregnet månedsinntekt/, { selector: 'input' }), {
        target: { value: '40000' }
      });
      await act(async () => {
        finishGrunnbelop({
          status: HttpStatus.Successfully,
          grunnbeloep: {
            dato: '2021-05-01',
            grunnbeloep: 106399,
            grunnbeloepPerMaaned: 8867,
            gjennomsnittPerAar: 104716,
            omregningsfaktor: 1.049807
          }
        });
      });
      expect(postKroniskKrav).toHaveBeenCalledTimes(1);
      expect(vi.mocked(postKroniskKrav).mock.calls[0][1].perioder[0].månedsinntekt).toBe(35000);
      await act(async () => {
        finishRequest({ status: HttpStatus.Created, violations: [] });
      });
      router.dispose();
    });

    it('releases the submission guard after an unexpected rejection', async () => {
      vi.mocked(postKroniskKrav)
        .mockRejectedValueOnce(new Error('Unexpected failure'))
        .mockResolvedValueOnce({ status: HttpStatus.Created, violations: [] });
      const router = renderForm(validState());
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Send kravet/ }));
      });
      screen.getAllByText('Skjul denne meldingen.').forEach((link) => fireEvent.click(link));
      fireEvent.click(screen.getByRole('button', { name: /Send kravet/ }));
      await waitFor(() => expect(router.state.location.pathname).toBe('/nb/kronisk/krav/kvittering'));
      expect(postKroniskKrav).toHaveBeenCalledTimes(2);
      router.dispose();
    });

    it.each([HttpStatus.Error, HttpStatus.Timeout, HttpStatus.UnprocessableEntity])(
      'allows a new attempt after status %s',
      async (status) => {
        vi.mocked(postKroniskKrav)
          .mockResolvedValueOnce({
            status,
            violations:
              status === HttpStatus.UnprocessableEntity
                ? [{ propertyPath: 'identitetsnummer', message: 'Backend validation error', validationType: 'Invalid' }]
                : []
          })
          .mockResolvedValueOnce({ status: HttpStatus.Created, violations: [] });
        const router = renderForm(validState());
        await act(async () => {
          fireEvent.click(screen.getByRole('button', { name: /Send kravet/ }));
        });
        expect(router.state.location.pathname).toBe('/nb/kronisk/krav');
        if (status === HttpStatus.Error)
          screen.getAllByText('Skjul denne meldingen.').forEach((link) => fireEvent.click(link));
        if (status === HttpStatus.UnprocessableEntity)
          expect(screen.getAllByText('Backend validation error').length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole('button', { name: /Send kravet/ }));
        await waitFor(() => expect(router.state.location.pathname).toBe('/nb/kronisk/krav/kvittering'));
        expect(postKroniskKrav).toHaveBeenCalledTimes(2);
        router.dispose();
      }
    );
  });

  it.each([
    { path: '/nb/kronisk/krav', route: '/:language/kronisk/krav', receipt: '/nb/kronisk/krav/kvittering' },
    { path: '/en/kronisk/krav', route: '/:language/kronisk/krav', receipt: '/en/kronisk/krav/kvittering' },
    { path: '/kronisk/krav', route: '/kronisk/krav', receipt: '/nb/kronisk/krav/kvittering' }
  ])('replaces $path with $receipt after successful submission', async ({ path, route, receipt }) => {
    const consoleError = vi.spyOn(console, 'error');
    const router = createMemoryRouter(
      [
        { path: '/before', element: <div>Before form</div> },
        {
          path: route,
          element: <KroniskKrav state={defaultKroniskKravState({ kvittering: true, feilmeldinger: [] })} />
        },
        { path: receipt, element: <div>Receipt</div> }
      ],
      { initialEntries: ['/before', path], initialIndex: 1 }
    );

    try {
      render(<RouterProvider router={router} />);

      await waitFor(() => expect(router.state.location.pathname).toBe(receipt));
      expect(router.state.historyAction).toBe('REPLACE');
      expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(
        /Cannot update a component|You should call navigate\(\) in a React\.useEffect/
      );

      await act(() => router.navigate(-1));

      expect(router.state.location.pathname).toBe('/before');
    } finally {
      consoleError.mockRestore();
      router.dispose();
    }
  });

  it.each([false, true])('stays on the form with validation errors and serverError=%s', (serverError) => {
    const router = createMemoryRouter(
      [
        {
          path: '/nb/kronisk/krav',
          element: (
            <KroniskKrav
              state={defaultKroniskKravState({
                kvittering: false,
                serverError,
                feilmeldinger: [{ skjemaelementId: 'fnr', feilmelding: 'Test validation error' }]
              })}
            />
          )
        }
      ],
      { initialEntries: ['/nb/kronisk/krav'] }
    );
    render(<RouterProvider router={router} />);

    expect(router.state.historyAction).toBe('POP');
    expect(router.state.location.pathname).toBe('/nb/kronisk/krav');
    router.dispose();
  });

  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
              <ArbeidsgiverProvider baseUrl='/base/url' status={200} arbeidsgivere={arbeidsgivere}>
                <KroniskKrav />
              </ArbeidsgiverProvider>
            </LanguageProvider>
          </MemoryRouter>
        ))
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it('should show warnings when input is missing', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    fireEvent.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);
    expect(screen.getAllByText(/Mangler fra dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler til dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler dager/).length).toBe(2);
    expect(screen.getAllByText(/Mangler beløp/).length).toBe(2);
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);
  });

  it('should show warnings when input is missing, and the warning should disappear when fixed', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);
    const fnrInput = screen.getByLabelText(/Fødselsnummer/);

    await user.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);

    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);

    await user.type(fnrInput, testFnr.GyldigeFraDolly.TestPerson1);
    expect(screen.queryByText(/Mangler fødselsnummer/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fødselsnummer må fylles ut/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should disappear when fixed 2', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const selectDager = screen.getByLabelText(/Antall dager/, { selector: 'select' });

    await user.click(submitButton);
    await user.selectOptions(selectDager, ['3']);

    await waitFor(
      () => {
        expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('should show warnings when input is missing, and the warning should dissapear when fixed 3', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];

    await user.click(submitButton);

    await user.type(BelopInput, '123');
    expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should disappear when fixed 4', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const bekreftCheckbox = screen.getByRole('checkbox', { name: /Jeg bekrefter at/ });

    await user.click(submitButton);

    await user.click(bekreftCheckbox);
    expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);
});
