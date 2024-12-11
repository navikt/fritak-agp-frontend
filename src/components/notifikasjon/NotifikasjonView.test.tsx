import React from 'react';
import { render } from '@testing-library/react';
import NotifikasjonController from './NotifikasjonController';
import { defaultNotifikasjonState, NotifikasjonState } from './state/NotifikasjonState';
import NotifikasjonType from './felles/NotifikasjonType';
import { MemoryRouter } from 'react-router-dom';
import HttpStatus from '../../api/HttpStatus';
import { GravidSoknadResponse } from '../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';

const initHistory = ['/'];
describe('NotifikasjonView', () => {
  const STATUS_PROGRESS = 'Venter…';
  const FANT_IKKE = 'Kravet er slettet av arbeidsgiver';
  const FEILMELDING = 'Det oppstod en feil';
  const INNHOLD = 'Din arbeidsgiver har søkt om utvidet støtte';

  const buildNotifikasjonSide = (state: NotifikasjonState, notifikasjonType: NotifikasjonType) => (
    <MemoryRouter initialEntries={initHistory}>
      <NotifikasjonController notifikasjonType={notifikasjonType} notifikasjonState={state} />
    </MemoryRouter>
  );

  it('should handle notfound', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.NotFound;
    state.notifikasjonType = NotifikasjonType.GravidSoknad;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(FANT_IKKE);
  });

  it('should handle Unauthorized', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Unauthorized;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(FANT_IKKE);
  });

  it('should show spinner', () => {
    const state = defaultNotifikasjonState();
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(STATUS_PROGRESS);
  });

  it('should handle errors', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Error;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should handle timeout', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Timeout;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should show Gravid Søknad', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    state.gravidSoknadResponse = {
      tiltak: ['']
    } as GravidSoknadResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(INNHOLD);
  });

  it('should handle empty Gravid Søknad', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should show Gravid Krav', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.gravidKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          belop: 1234
        },
        {
          fom: '2020-05-04',
          tom: '2020-06-05',
          belop: 1234.5
        }
      ]
    } as GravidKravResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidKrav));
    expect(container.textContent).toContain(INNHOLD);
    expect(container.textContent).toContain('02.01.20 - 03.02.20');
    expect(container.textContent).toContain('04.05.20 - 05.06.20');
    expect(container.textContent).toContain('2 468,50 kr');
    expect(container.textContent).toContain('periodene:');
  });

  it('should show Gravid Krav med en periode', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.gravidKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          belop: 1234
        }
      ]
    } as GravidKravResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidKrav));
    expect(container.textContent).toContain(INNHOLD);
    expect(container.textContent).toContain('02.01.20 - 03.02.20');
    expect(container.textContent).toContain('1 234,00 kr');
    expect(container.textContent).toContain('dagene');
  });

  it('should handle empty Gravid Krav', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidKrav));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should show slettet Gravid Krav med en periode', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.gravidKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          belop: 1234
        }
      ]
    } as GravidKravResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.GravidKravSlettet));
    expect(container.textContent).toContain(INNHOLD);
    expect(container.textContent).toContain('02.01.20 - 03.02.20');
    expect(container.textContent).toContain('1 234,00 kr');
    expect(container.textContent).toContain('dagene');
  });

  it('should show Kronisk Krav', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.kroniskKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          belop: 1234
        },
        {
          fom: '2020-05-04',
          tom: '2020-06-05',
          belop: 1234
        }
      ]
    } as unknown as KroniskKravResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.KroniskKrav));
    expect(container.textContent).toContain(INNHOLD);
    expect(container.textContent).toContain('02.01.20 - 03.02.20');
    expect(container.textContent).toContain('04.05.20 - 05.06.20');
    expect(container.textContent).toContain('468,00');
    expect(container.textContent).toContain('innen 15.01.20');
  });

  it('should show slettet Kronisk Krav', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.kroniskKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          belop: 1234
        },
        {
          fom: '2020-05-04',
          tom: '2020-06-05',
          belop: 1234
        }
      ]
    } as unknown as KroniskKravResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.KroniskKravSlettet));
    expect(container.textContent).toContain(INNHOLD);
    expect(container.textContent).toContain('02.01.20 - 03.02.20');
    expect(container.textContent).toContain('04.05.20 - 05.06.20');
    expect(container.textContent).toContain('468,00');
  });

  it('should handle empty Kronisk Krav', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.KroniskKrav));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should handle things going wrong', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    const { container } = render(buildNotifikasjonSide(state, 'UkjentSkjema'));
    expect(container.textContent).toContain(FEILMELDING);
  });

  it('should show Kronisk Søknad', () => {
    const state = defaultNotifikasjonState();

    state.status = HttpStatus.Successfully;
    state.kroniskSoknadResponse = {
      id: '2e9248a9-fcba-44a9-bf8b-f78ab6290766',
      opprettet: '2021-09-17T10:45:08.60627',
      virksomhetsnummer: '810007842',
      identitetsnummer: '24058219491',
      fravaer: [
        {
          yearMonth: '2020-06',
          antallDagerMedFravaer: 3
        },
        {
          yearMonth: '2020-03',
          antallDagerMedFravaer: 3
        }
      ],
      antallPerioder: 2,
      bekreftet: true,
      harVedlegg: false,
      sendtAv: '10107400090',
      virksomhetsnavn: null,
      journalpostId: null,
      oppgaveId: null,
      sendtAvNavn: 'ARTIG HEST'
    } as unknown as KroniskSoknadResponse;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.KroniskSoknad));
    expect(container.textContent).toContain(INNHOLD);
  });

  it('should handle empty Kronisk Søknad', () => {
    const state = defaultNotifikasjonState();
    state.status = HttpStatus.Successfully;
    const { container } = render(buildNotifikasjonSide(state, NotifikasjonType.KroniskSoknad));
    expect(container.textContent).toContain(FEILMELDING);
  });
});
