import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import Forside from './components/Forside';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import GravidKvittering from './components/gravid/GravidKvittering';
import KroniskSide from './components/kronisk/KroniskSide';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import GravidSide from './components/gravid/GravidSide';
import GravidKrav from './components/gravidkrav/GravidKrav';

describe('ApplicationRoutes', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  const makeRoute = (path: string) => (
    <Router history={makeHistory(path)}>
      <ApplicationRoutes />
    </Router>
  );

  const makeRender = (path: string) => TestRenderer.create(makeRoute(path));

  it('should show default', () => {
    expect(makeRender('/').root.find(Forside));
  });

  it('should show token fornyet', () => {
    expect(makeRender('/token-fornyet').root.find(TokenFornyet));
  });

  it('should show gravid søknad', () => {
    expect(makeRender('/gravid/soknad').root.findByType(GravidSide));
  });

  it('should show gravid kvittering', () => {
    expect(makeRender('/gravid/soknad/kvittering').root.find(GravidKvittering));
  });

  it('should show kronisk søknad', () => {
    expect(makeRender('/kronisk/soknad').root.findByType(KroniskSide));
  });

  it('should show kronisk kvittering', () => {
    expect(makeRender('/kronisk/soknad/kvittering').root.findByType(KroniskKvittering));
  });

  it('should show gravid krav', () => {
    expect(makeRender('/gravid/krav').root.findByType(GravidKrav));
  });
});
