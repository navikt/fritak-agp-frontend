import React from 'react';
import { ArbeidsgiverProvider } from './ArbeidsgiverContext';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Status } from '../api/ArbeidsgiverAPI';
import { MemoryRouter } from 'react-router-dom';

describe('ArbeidsgiverContext', () => {
  let container: Element = document.createElement('div');

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement('reset');
  });

  it('should show spinner immediately', async () => {
    await act(async () => {
      render(
        <ArbeidsgiverProvider arbeidsgivere={[]} status={Status.NotStarted}>
          Barn
        </ArbeidsgiverProvider>,
        container
      );
    });
    expect(container.textContent).toBe('Venter...');
    expect(container.textContent).not.toContain('Barn');
  });

  it('should show spinner when loading', async () => {
    await act(async () => {
      render(<ArbeidsgiverProvider status={Status.Started}>Barn</ArbeidsgiverProvider>, container);
    });
    expect(container.textContent).toBe('Venter...');
    expect(container.textContent).not.toContain('Barn');
  });

  it('should show error message', async () => {
    await act(async () => {
      render(<ArbeidsgiverProvider status={Status.Error}>Barn</ArbeidsgiverProvider>, container);
    });
    expect(container.textContent).toContain('feil');
    expect(container.textContent).not.toContain('Barn');
  });

  it('should show error message when unknown error occured', async () => {
    await act(async () => {
      render(<ArbeidsgiverProvider status={Status.Unknown}>Barn</ArbeidsgiverProvider>, container);
    });
    expect(container.textContent).toContain('feil');
    expect(container.textContent).not.toContain('Barn');
  });

  it('should show when request timedout', async () => {
    await act(async () => {
      render(<ArbeidsgiverProvider status={Status.Timeout}>Barn</ArbeidsgiverProvider>, container);
    });
    expect(container.textContent).toContain('feil');
    expect(container.textContent).not.toContain('Barn');
  });

  it('should show children when successful', async () => {
    render(<ArbeidsgiverProvider status={Status.Successfully}>Barn</ArbeidsgiverProvider>, container);
    expect(container.textContent).toBe('Barn');
  });

  it('should redirect to login page when unauthorized', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ArbeidsgiverProvider status={Status.Unauthorized}>Barn</ArbeidsgiverProvider>
      </MemoryRouter>,
      container
    );
    // @ts-ignore
    expect(container.firstChild.className).toBe('arbeidsgiver-provider-redirect');
    expect(container.textContent).not.toContain('Barn');
  });
});
