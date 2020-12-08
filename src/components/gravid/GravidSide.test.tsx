import React from 'react';
import GravidSide from './GravidSide';
import { render, unmountComponentAtNode } from 'react-dom';
import GravidStatus from './GravidStatus';
import { axe } from 'jest-axe';
import {
  cleanup,
  fireEvent,
  render as renderTestingLibrary,
  screen,
  waitFor
} from '@testing-library/react';

import testFnr from '../../mockData/testFnr';
import testOrgnr from '../../mockData/testOrgnr';

describe('GravidSide', () => {
  let htmlDivElement: Element = document.createElement('div');

  beforeEach(() => {
    htmlDivElement = document.createElement('div');
    document.body.appendChild(htmlDivElement);
  });

  afterEach(() => {
    unmountComponentAtNode(htmlDivElement);
    htmlDivElement.remove();
    htmlDivElement = document.createElement('div');
    jest.restoreAllMocks();
  });

  const INFORMASJON = 'Den ansatte';
  const FODSELSNR = 'Fødselsnummer';
  const ORGANISASJONSNUMMER = 'Organisasjonsnummer';
  const TILRETTELEGGE = 'Har dere prøvd å tilrettelegge arbeidsdagen';
  const TILTAK = 'Hvilke tiltak er forsøkt';
  const VIDERE = 'Forsøksvis tilrettelegging er i utgangspunktet ';
  const OMPLASSERING = 'Er omplassering av den ansatte forsøkt';
  const DOKUMENTASJON = 'Hvis dere har fått dokumentasjon fra den ansatte';
  const BEKREFT = 'Jeg vet at NAV kan trekke tilbake retten til';
  const SEND_KNAPP = 'Send søknad';
  const STATUS_DEFAULT = 'NAV kan dekke sykepenger i arbeidsgiverperioden';
  const STATUS_VENTER = 'Vennligst vent';
  const STATUS_OK = 'Søknaden er mottatt';
  const STATUS_ERROR = 'Det oppstod en feil';

  it('skal vise kun søknadsskjema som default', () => {
    render(<GravidSide status={GravidStatus.DEFAULT} />, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  });

  it('skal vise venteside når man venter på svar', () => {
    render(<GravidSide status={GravidStatus.IN_PROGRESS} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  });

  it('skal vise kvittering når positivt svar', () => {
    render(<GravidSide status={GravidStatus.SUCCESS} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).toContain(STATUS_OK);
    expect(htmlDivElement.textContent).not.toContain(STATUS_ERROR);
  });

  it('skal vise feilmelding når svar feilet', () => {
    render(<GravidSide status={GravidStatus.ERROR} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_DEFAULT);
    expect(htmlDivElement.textContent).not.toContain(STATUS_VENTER);
    expect(htmlDivElement.textContent).not.toContain(STATUS_OK);
    expect(htmlDivElement.textContent).toContain(STATUS_ERROR);
  });

  it('skal vise samtlige feilmelding når alle felter mangler', () => {
    render(
      <GravidSide tilrettelegge={true} validated={true} bekreftet={true} />,
      htmlDivElement
    );
    expect(htmlDivElement.textContent).toContain(
      'Fyll ut gyldig fødselsnummer'
    );
    expect(htmlDivElement.textContent).toContain(
      'Fyll ut gyldig organisasjonsnummer'
    );
    expect(htmlDivElement.textContent).toContain(
      'Du må oppgi minst ett tiltak dere har prøvd'
    );
    // expect(container.textContent).toContain('Spesifiser hvilke tiltak som er forsøkt');
    expect(htmlDivElement.textContent).toContain('Velg omplassering');
    expect(htmlDivElement.textContent).toContain('Last opp dokumentasjon');
    // expect(container.textContent).toContain('Bekreft at opplysningene er korrekt');
  });

  it('skal vise fødselsnr, termindato og tilrettelegge - som default', () => {
    render(<GravidSide />, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INFORMASJON);
    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(ORGANISASJONSNUMMER);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(VIDERE);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  });

  // it('skal vise feilmelding for ugyldig fødselsnummer - validert', () => {
  //   render(
  //     <GravidSide fnr="123123" validated={true}/>
  //     , container
  //   );
  //   expect(container.textContent).toContain('Ugyldig fødselsnummer');
  //   expect(container.textContent).toContain('123123');
  // })
  //
  // it('skal ikke vise feilmelding for ugyldig fødselsnummer - ikke validert', () => {
  //   render(
  //     <GravidSide fnr="123" validated={false}/>
  //     , container
  //   );
  //   expect(container.textContent).not.toContain('Ugyldig fødselsnummer');
  // })

  it('skal ikke vise tiltak, omplassering, dokumentasjon, bekreft og knapp - uten at forsøk er valgt', () => {
    render(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={undefined}
      />,
      htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  });

  it('skal ikke vise dokumentasjon, bekreft og knapp - før man velger å gå videre', () => {
    render(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={false}
      />,
      htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  });

  it('skal vise dokumentasjon, bekreft og knapp - etter man har valgt å gå videre', () => {
    render(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />,
      htmlDivElement
    );
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).toContain(BEKREFT);
    expect(htmlDivElement.textContent).toContain(SEND_KNAPP);
  });

  it('skal vise advarseler etter at man har klikket submit', () => {
    renderTestingLibrary(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
    );

    const jaCheck = screen.getByLabelText('Ja');
    fireEvent.click(jaCheck);
    const submitButton = screen.getByText('Send søknad');
    fireEvent.click(submitButton);

    expect(screen.queryAllByText(/Fyll ut gyldig fødselsnummer/).length).toBe(
      2
    );
    expect(
      screen.queryAllByText(/Fyll ut gyldig organisasjonsnummer/).length
    ).toBe(2);
    expect(
      screen.queryAllByText(/Du må oppgi minst ett tiltak dere har prøvd/)
        .length
    ).toBe(2);
    expect(screen.queryAllByText(/Velg omplassering/).length).toBe(2);
    expect(
      screen.queryAllByText(/Bekreft at opplysningene er korrekt/).length
    ).toBe(2);
  });

  it('skal vise feil om backend når det ikke kommer data, etter at man har klikket submit', async () => {
    renderTestingLibrary(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
    );

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(null),
        text: () => Promise.resolve(null),
        clone: () => ({
          json: () => Promise.reject(null),
          text: () => Promise.resolve(null)
        })
      } as unknown) as Response)
    );

    fireEvent.click(screen.getByLabelText('Ja'));

    fireEvent.click(screen.getByLabelText('Hjemmekontor'));

    const checker = screen.getAllByLabelText('Ja');

    if (checker) {
      fireEvent.click(checker[1]);
    }

    fireEvent.click(screen.getByLabelText(/Jeg bekrefter at opplysningene/));

    const fnr = screen.getByLabelText(/Fødselsnummer/);

    fireEvent.change(fnr, {
      target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
    });

    const orgNr = screen.getByLabelText(/Organisasjonsnummer/);

    fireEvent.change(orgNr, {
      target: { value: testOrgnr.GyldigeOrgnr.TestOrg1 }
    });

    const submitButton = screen.getByText('Send søknad');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Lagringen gikk galt/)).toBeInTheDocument();
    });

    expect(screen.queryAllByText(/Fyll ut gyldig fødselsnummer/).length).toBe(
      0
    );
    expect(
      screen.queryAllByText(/Fyll ut gyldig organisasjonsnummer/).length
    ).toBe(0);
    expect(
      screen.queryAllByText(/Du må oppgi minst ett tiltak dere har prøvd/)
        .length
    ).toBe(0);
    expect(screen.queryAllByText(/Velg omplassering/).length).toBe(0);
    expect(
      screen.queryAllByText(/Bekreft at opplysningene er korrekt/).length
    ).toBe(0);
  });

  it('skal vise feil fra backend, etter at man har klikket submit', async () => {
    renderTestingLibrary(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
    );

    const mockData = {
      title: 'Title feil',
      status: 'Status feil'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(null),
        clone: () => ({
          json: () => Promise.resolve(mockData),
          text: () => Promise.resolve(null)
        })
      } as unknown) as Response)
    );

    fyllUtOgSubmit();

    await waitFor(() => {
      expect(screen.getByText(/Title feil/)).toBeInTheDocument();
    });
  });

  it('skal vise valideringsfeil fra backend, etter at man har klikket submit', async () => {
    renderTestingLibrary(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
    );

    const mockData = {
      violations: [
        {
          validationType: 'NotNull',
          message: 'Det angitte feltet er påkrevd',
          propertyPath: 'ansatteFeilmeldingId',
          invalidValue: 'null'
        }
      ],
      type: 'urn:nav:helsearbeidsgiver:validation-error',
      title: 'Valideringen av input feilet',
      status: 422,
      detail: 'Ett eller flere felter har feil.',
      instance: 'about:blank'
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(null),
        clone: () => ({
          json: () => Promise.resolve(mockData),
          text: () => Promise.resolve(null)
        })
      } as unknown) as Response)
    );

    fyllUtOgSubmit();

    await waitFor(() => {
      expect(
        screen.queryAllByText(/Det angitte feltet er påkrevd/).length
      ).toBe(2);
    });
  });

  it('should have no a11y violations', async () => {
    const { container } = renderTestingLibrary(
      <GravidSide
        fnr='123'
        dato={new Date(2020, 9, 28)}
        tilrettelegge={false}
        videre={true}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});

function fyllUtOgSubmit() {
  const jaCheck = screen.getByLabelText('Ja');
  fireEvent.click(jaCheck);

  fireEvent.click(screen.getByLabelText('Hjemmekontor'));

  const checker = screen.getAllByLabelText('Ja');

  if (checker) {
    fireEvent.click(checker[1]);
  }

  fireEvent.click(screen.getByLabelText(/Jeg bekrefter at opplysningene/));

  const fnr = screen.getByLabelText(/Fødselsnummer/);

  fireEvent.change(fnr, {
    target: { value: testFnr.GyldigeFraDolly.TestPerson1 }
  });

  const orgNr = screen.getByLabelText(/Organisasjonsnummer/);

  fireEvent.change(orgNr, {
    target: { value: testOrgnr.GyldigeOrgnr.TestOrg1 }
  });

  const submitButton = screen.getByText('Send søknad');
  fireEvent.click(submitButton);
}
