import React from 'react';
import Side from './Side';
import { ArbeidsgiverProvider, Status } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

describe('Side', () => {
  let container = document.createElement('div');

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  const buildSide = (required: boolean, arbeidsgivere: Array<Organisasjon>, status: number) => {
    return (
      <MemoryRouter>
        <ArbeidsgiverProvider arbeidsgivere={arbeidsgivere} status={status}>
          <Side bedriftsmeny={required} sidetittel='Skjema' title='Søknad' subtitle=''>
            barnenoder
          </Side>
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );
  };

  const IKKE_RETTIGHETER = 'Du har ikke rettigheter';
  const BARNE_NODER = 'barnenoder';
  const ARBEIDSGIVERE = [{ Name: '' } as Organisasjon];
  const UTEN_ARBEIDSGIVERE = [];

  it('should show advarsel', () => {
    act(() => {
      render(buildSide(true, UTEN_ARBEIDSGIVERE, Status.Successfully), container);
    });
    expect(container.textContent).not.toContain(BARNE_NODER);
    expect(container.textContent).toContain(IKKE_RETTIGHETER);
  });

  it('should show children', () => {
    act(() => {
      render(buildSide(true, ARBEIDSGIVERE, Status.Successfully), container);
    });
    expect(container.textContent).toContain(BARNE_NODER);
    expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  });

  it('should show children - not required and empty arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, UTEN_ARBEIDSGIVERE, Status.Successfully), container);
    });
    expect(container.textContent).toContain(BARNE_NODER);
    expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  });

  it('should show children - not required and arbeidsgivere', () => {
    act(() => {
      render(buildSide(false, ARBEIDSGIVERE, Status.Successfully), container);
    });
    expect(container.textContent).toContain(BARNE_NODER);
    expect(container.textContent).not.toContain(IKKE_RETTIGHETER);
  });
});
