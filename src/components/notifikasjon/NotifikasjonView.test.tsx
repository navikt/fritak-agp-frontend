import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { cleanup } from '@testing-library/react';
import NotifikasjonController from './NotifikasjonController';
import { defaultNotitikasjonState, NotifikasjonState } from './state/NotifikasjonState';
import NotifikasjonType from './felles/NotifikasjonType';
import mockHistory from '../../mockData/mockHistory';
import { Router } from 'react-router-dom';
import HttpStatus from '../../api/HttpStatus';
import testGravidSoknadResponse from '../../mockData/testGravidSoknadResponse';
import { GravidSoknadResponse } from '../../api/gravid/GravidSoknadResponse';

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
  const SENDT_AV = '22018520056';
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

  it('should show Gravid Krav', () => {});

  it('should show Kronisk Søknad', () => {});

  it('should show Kronisk Krav', () => {});
});
