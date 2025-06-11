import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { render } from '@testing-library/react';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import env from '../../config/environment';
import HttpStatus from '../../api/HttpStatus';

const initHistory = ['/'];

vi.mock('react-i18next', () => ({
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

vi.spyOn(env, 'minSideArbeidsgiver', 'get').mockReturnValue(
  'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/sak-restore-session'
);

describe('KroniskSide', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <ArbeidsgiverProvider arbeidsgivere={testOrganisasjoner} status={HttpStatus.Successfully} baseUrl={''}>
          <h1>h1</h1>
          <h2>h2</h2>
          <KroniskSide />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
