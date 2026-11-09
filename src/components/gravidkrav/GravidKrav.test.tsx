import React from 'react';
import { render, cleanup, act, waitFor, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';

import GravidKrav from './GravidKrav';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import patchGravidKrav from '../../api/kroniskkrav/patchGravidKrav';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import { parseDato } from '../../utils/dato/Dato';
import { EndringsAarsak } from './EndringsAarsak';
import HttpStatus from '../../api/HttpStatus';
import { ValidationResponse } from '../../state/validation/ValidationResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import testFnr from '../../mockData/testFnr';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Locales from '../../locale/Locales';
import buildResources from '../../locale/buildResources';

vi.unmock('react-i18next');
vi.mock('../../api/gravidkrav/postGravidKrav');
vi.mock('../../api/kroniskkrav/patchGravidKrav');
vi.mock('../../api/grunnbelop/getGrunnbeloep', () => ({ default: vi.fn(async () => ({ status: 200 })) }));

describe('GravidKrav', () => {
  beforeAll(async () => {
    if (!i18next.isInitialized) {
      await i18next
        .use(initReactI18next)
        .init({ resources: buildResources(Locales), lng: 'nb', react: { useSuspense: false } });
    }
  });

  describe('submission', () => {
    const validState = (overrides: Partial<GravidKravState> = {}) =>
      defaultGravidKravState({
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

    const renderForm = (state: GravidKravState) => {
      const router = createMemoryRouter(
        [
          {
            path: '/nb/gravid/krav',
            element: (
              <ArbeidsgiverProvider
                arbeidsgivere={testOrganisasjoner}
                status={200}
                arbeidsgiverId='810008032'
                baseUrl='/base/url'
              >
                <GravidKrav state={state} />
              </ArbeidsgiverProvider>
            )
          },
          { path: '/nb/gravid/krav/kvittering', element: <div>Receipt</div> }
        ],
        { initialEntries: ['/nb/gravid/krav'] }
      );
      render(<RouterProvider router={router} />);
      return router;
    };

    beforeEach(() => {
      vi.mocked(postGravidKrav).mockReset();
      vi.mocked(patchGravidKrav).mockReset();
      vi.mocked(getGrunnbeloep).mockResolvedValue({ status: HttpStatus.Successfully });
    });

    it.each([false, true])('sends the validated request with endringskrav=%s', async (endringskrav) => {
      const api = endringskrav ? vi.mocked(patchGravidKrav) : vi.mocked(postGravidKrav);
      api.mockResolvedValue({ status: HttpStatus.Created, violations: [] });
      const router = renderForm(validState({ endringskrav, kravId: 'krav-id', endringsAarsak: EndringsAarsak.ANNET }));
      fireEvent.click(screen.getByRole('button', { name: endringskrav ? /Send inn endring/ : /Send krav/ }));
      await waitFor(() => expect(router.state.location.pathname).toBe('/nb/gravid/krav/kvittering'));
      expect(api).toHaveBeenCalledTimes(1);
      expect(api.mock.calls[0].at(-1)).toEqual({
        identitetsnummer: testFnr.GyldigeFraDolly.TestPerson1,
        virksomhetsnummer: '810008032',
        antallDager: 260,
        bekreftet: true,
        perioder: [
          { fom: '2021-08-02', tom: '2021-08-06', antallDagerMedRefusjon: 5, månedsinntekt: 35000, gradering: 1 }
        ],
        ...(endringskrav ? { aarsakEndring: EndringsAarsak.ANNET } : {})
      });
      if (endringskrav) expect(vi.mocked(patchGravidKrav).mock.calls[0][1]).toBe('krav-id');
      expect(endringskrav ? postGravidKrav : patchGravidKrav).not.toHaveBeenCalled();
      router.dispose();
    });

    it('does not send an invalid form and revalidates corrected fields', async () => {
      const router = renderForm(validState({ fnr: '123' }));
      fireEvent.click(screen.getByRole('button', { name: /Send krav/ }));
      expect(postGravidKrav).not.toHaveBeenCalled();
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
      expect(postGravidKrav).not.toHaveBeenCalled();
      router.dispose();
    });

    it('sends only once during rapid clicks, field edits and a grunnbelop update', async () => {
      let finishRequest!: (response: ValidationResponse<GravidKravResponse>) => void;
      vi.mocked(postGravidKrav).mockReturnValue(
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
      const submit = screen.getByRole('button', { name: /Send krav/ });
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
      expect(postGravidKrav).toHaveBeenCalledTimes(1);
      expect(vi.mocked(postGravidKrav).mock.calls[0][1].perioder[0].månedsinntekt).toBe(35000);
      await act(async () => {
        finishRequest({ status: HttpStatus.Created, violations: [] });
      });
      router.dispose();
    });

    it.each([HttpStatus.Error, HttpStatus.Timeout, HttpStatus.UnprocessableEntity])(
      'allows a new attempt after status %s',
      async (status) => {
        vi.mocked(postGravidKrav)
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
          fireEvent.click(screen.getByRole('button', { name: /Send krav/ }));
        });
        expect(router.state.location.pathname).toBe('/nb/gravid/krav');
        if (status === HttpStatus.Error)
          screen.getAllByText('Skjul denne meldingen.').forEach((link) => fireEvent.click(link));
        if (status === HttpStatus.UnprocessableEntity)
          expect(screen.getAllByText('Backend validation error').length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole('button', { name: /Send krav/ }));
        await waitFor(() => expect(router.state.location.pathname).toBe('/nb/gravid/krav/kvittering'));
        expect(postGravidKrav).toHaveBeenCalledTimes(2);
        router.dispose();
      }
    );

    it('releases the submission guard after an unexpected rejection', async () => {
      vi.mocked(postGravidKrav)
        .mockRejectedValueOnce(new Error('Unexpected failure'))
        .mockResolvedValueOnce({ status: HttpStatus.Created, violations: [] });
      const router = renderForm(validState());
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /Send krav/ }));
      });
      screen.getAllByText('Skjul denne meldingen.').forEach((link) => fireEvent.click(link));
      fireEvent.click(screen.getByRole('button', { name: /Send krav/ }));
      await waitFor(() => expect(router.state.location.pathname).toBe('/nb/gravid/krav/kvittering'));
      expect(postGravidKrav).toHaveBeenCalledTimes(2);
      router.dispose();
    });
  });

  it.each([
    { path: '/nb/gravid/krav', route: '/:language/gravid/krav', receipt: '/nb/gravid/krav/kvittering' },
    { path: '/en/gravid/krav', route: '/:language/gravid/krav', receipt: '/en/gravid/krav/kvittering' },
    { path: '/gravid/krav', route: '/gravid/krav', receipt: '/nb/gravid/krav/kvittering' }
  ])('replaces $path with $receipt after successful submission', async ({ path, route, receipt }) => {
    const consoleError = vi.spyOn(console, 'error');
    const router = createMemoryRouter(
      [
        { path: '/before', element: <div>Before form</div> },
        {
          path: route,
          element: <GravidKrav state={defaultGravidKravState({ kvittering: true, feilmeldinger: [] })} />
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
          path: '/nb/gravid/krav',
          element: (
            <GravidKrav
              state={defaultGravidKravState({
                kvittering: false,
                serverError,
                feilmeldinger: [{ skjemaelementId: 'fnr', feilmelding: 'Test validation error' }]
              })}
            />
          )
        }
      ],
      { initialEntries: ['/nb/gravid/krav'] }
    );
    render(<RouterProvider router={router} />);

    expect(router.state.historyAction).toBe('POP');
    expect(router.state.location.pathname).toBe('/nb/gravid/krav');
    router.dispose();
  });

  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <ArbeidsgiverProvider baseUrl={''}>
              <GravidKrav />
            </ArbeidsgiverProvider>
          </MemoryRouter>
        ))
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
