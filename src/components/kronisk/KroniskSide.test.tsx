import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'jest-axe';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Router } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import mockHistory from '../../mockData/mockHistory';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
        t: (str: string) => str
      }
    };
  }
}));

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

  it('should have no a11y violations', async () => {
    act(() => {
      render(
        <Router history={mockHistory('/')}>
          <ArbeidsgiverProvider
            arbeidsgivere={testOrganisasjoner}
            status={ArbeidsgiverStatus.Successfully}
            baseUrl={''}
          >
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
