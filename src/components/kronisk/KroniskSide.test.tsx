import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'jest-axe';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Router } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import mockHistory from '../../mockData/mockHistory';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str
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
