import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

describe('Forside', () => {
  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  const ARBEIDSGIVERE = [{ Name: '' } as Organisasjon];

  it('should have no a11y violations', async () => {
    const rendered = render(
      <Router history={makeHistory('/')}>
        <ArbeidsgiverProvider arbeidsgivere={ARBEIDSGIVERE} status={Status.Successfully}>
          <Forside />
        </ArbeidsgiverProvider>
      </Router>
    );
    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
