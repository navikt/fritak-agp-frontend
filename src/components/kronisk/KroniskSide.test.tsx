import React from 'react';
import KroniskSide from './KroniskSide';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';

describe('KroniskSide', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should have no a11y violations', async () => {
    const rendered = render(
      <Router history={makeHistory('/')}>
        <ArbeidsgiverProvider arbeidsgivere={testOrganisasjoner} status={Status.Successfully}>
          <KroniskSide />
        </ArbeidsgiverProvider>
      </Router>
    );
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
