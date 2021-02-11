import React from 'react';
import Side from './Side';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { createMemoryHistory } from 'history';
import testOrganisasjoner from '../mockData/testOrganisasjoner';
import ArbeidsgiverStatus from '../context/arbeidsgiver/ArbeidsgiverStatus';

describe('Side', () => {
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

  const buildSide = (required: boolean, arbeidsgivere: Array<Organisasjon>, status: ArbeidsgiverStatus) => {
    return (
      <Router history={makeHistory('/')}>
        <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={status}>
          <Side bedriftsmeny={required} sidetittel='Skjema' title='Søknad' subtitle=''>
            {BARNE_NODER}
          </Side>
        </ArbeidsgiverProvider>
      </Router>
    );
  };

  const IKKE_RETTIGHETER = 'Du har ikke rettigheter';
  const BARNE_NODER = 'barnenoder';
  const ARBEIDSGIVERE = testOrganisasjoner;
  const UTEN_ARBEIDSGIVERE = [];

  it('should show advarsel - required and not arbeidsgivere', () => {
    act(() => {
      render(buildSide(true, UTEN_ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully), container);
    });
    expect(container.textContent).not.toContain(BARNE_NODER);
    expect(container.textContent).toContain(IKKE_RETTIGHETER);
  });

  // it('should show children - required and arbeidsgivere', () => {
  //   act(() => {
  //     render(buildSide(true, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully), container);
  //   });
  //   expect(container.textContent).toContain(BARNE_NODER);
  //   expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  // });

  it('should show children - not required and empty arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, UTEN_ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully), container);
    });
    expect(container.textContent).toContain(BARNE_NODER);
    expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  });

  it('should show children - not required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, ArbeidsgiverStatus.Successfully), container);
    });
    expect(container.textContent).toContain(BARNE_NODER);
    expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  });
});
