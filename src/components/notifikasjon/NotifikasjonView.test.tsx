import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import NotifikasjonController from './NotifikasjonController';
import { defaultNotitikasjonState, NotifikasjonState } from './state/NotifikasjonState';
import NotifikasjonType from './felles/NotifikasjonType';
import mockHistory from '../../mockData/mockHistory';
import { Router } from 'react-router-dom';
import HttpStatus from '../../api/HttpStatus';
import { GravidSoknadResponse } from '../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';
import ArbeidType from '../kronisk/ArbeidType';
import PaakjenningerType from '../kronisk/PaakjenningerType';

describe('NotifikasjonView', () => {
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
    cleanup();
  });

  const STATUS_PROGRESS = 'Venter...';
  const FANT_IKKE = 'Fant ikke';
  const FEILMELDING = 'Det oppstod en feil';
  const INNHOLD = 'Informasjon om sykepenger';

  const buildNotifikasjonSide = (state: NotifikasjonState, notifikasjonType: NotifikasjonType) => (
    <Router history={mockHistory('/')}>
      <NotifikasjonController notifikasjonType={notifikasjonType} notifikasjonState={state} />
    </Router>
  );

  it('should handle notfound', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.NotFound;
    state.notifikasjonType = NotifikasjonType.GravidSoknad;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FANT_IKKE);
  });

  it('should handle Unauthorized', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Unauthorized;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FANT_IKKE);
  });

  it('should show spinner', () => {
    const state = defaultNotitikasjonState();
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(STATUS_PROGRESS);
  });

  it('should handle errors', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Error;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });

  it('should handle timeout', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Timeout;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });

  it('should show Gravid Søknad', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Successfully;
    state.gravidSoknadResponse = {
      tiltak: ['']
    } as GravidSoknadResponse;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INNHOLD);
  });

  it('should handle empty Gravid Søknad', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Successfully;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });

  it('should show Gravid Krav', () => {
    const state = defaultNotitikasjonState();

    state.status = HttpStatus.Successfully;
    state.gravidKravResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      periode: {
        fom: '2020-01-02',
        tom: '2020-02-03',
        beloep: 1234.5
      }
    } as GravidKravResponse;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidKrav), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INNHOLD);
    expect(htmlDivElement.textContent).toContain('02.01.20 - 03.02.20');
    expect(htmlDivElement.textContent).toContain('234,50');
  });

  it('should handle empty Gravid Krav', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Successfully;
    render(buildNotifikasjonSide(state, NotifikasjonType.GravidKrav), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });

  it('should show Kronisk Krav', () => {
    const state = defaultNotitikasjonState();

    state.status = HttpStatus.Successfully;
    state.kroniskKravResponse = ({
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      perioder: [
        {
          fom: '2020-01-02',
          tom: '2020-02-03',
          beloep: 1234
        },
        {
          fom: '2020-05-04',
          tom: '2020-06-05',
          beloep: 1234
        }
      ]
    } as unknown) as KroniskKravResponse;
    render(buildNotifikasjonSide(state, NotifikasjonType.KroniskKrav), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INNHOLD);
    expect(htmlDivElement.textContent).toContain('02.01.20 - 05.06.20');
    expect(htmlDivElement.textContent).toContain('468,00');
    expect(htmlDivElement.textContent).toContain('innen 15.01.20');
  });

  it('should handle empty Kronisk Krav', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Successfully;
    render(buildNotifikasjonSide(state, NotifikasjonType.KroniskKrav), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });

  it('should show Kronisk Søknad', () => {
    const state = defaultNotitikasjonState();

    state.status = HttpStatus.Successfully;
    state.kroniskSoknadResponse = {
      id: '1',
      opprettet: '2020-01-01',
      virksomhetsnummer: '123',
      virksomhetsnavn: 'Virksomhet',
      arbeidstyper: [ArbeidType.STILLESITTENDE],
      paakjenningstyper: [PaakjenningerType.UKOMFORTABEL],
      paakjenningBeskrivelse: '',
      fravaer: [],
      sendtAv: '',
      harVedlegg: false,
      journalpostId: '123',
      oppgaveId: 'abc'
    } as KroniskSoknadResponse;
    render(buildNotifikasjonSide(state, NotifikasjonType.KroniskSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(INNHOLD);
    expect(htmlDivElement.textContent).toContain('Påkjenninger på arbeidsstedet');
  });

  it('should handle empty Kronisk Søknad', () => {
    const state = defaultNotitikasjonState();
    state.status = HttpStatus.Successfully;
    render(buildNotifikasjonSide(state, NotifikasjonType.KroniskSoknad), htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FEILMELDING);
  });
});
