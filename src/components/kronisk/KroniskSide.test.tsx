import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'jest-axe';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { MemoryRouter } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

const initHistory = ['/'];

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
        <MemoryRouter initialEntries={initHistory}>
          <ArbeidsgiverProvider
            arbeidsgivere={testOrganisasjoner}
            status={ArbeidsgiverStatus.Successfully}
            baseUrl={''}
          >
            <KroniskSide />
          </ArbeidsgiverProvider>
        </MemoryRouter>,
        container
      );
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
