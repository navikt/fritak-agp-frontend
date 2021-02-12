import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'jest-axe';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

describe('KroniskSide', () => {
  jest.setTimeout(10000); // 10 second timeout

  let container = document.createElement('div');
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  const makeHistory = (path: string) => {
    const history = createMemoryHistory();
    history.push(path);
    return history;
  };

  it('should have no a11y violations', async () => {
    act(() => {
      render(
        <Router history={makeHistory('/')}>
          <ArbeidsgiverProvider arbeidsgivere={testOrganisasjoner} status={Status.Successfully}>
            <KroniskSide />
          </ArbeidsgiverProvider>
        </Router>,
        container
      );
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
