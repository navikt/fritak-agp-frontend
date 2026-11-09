import React from 'react';
import { render, cleanup, act, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';

import GravidKrav from './GravidKrav';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import { defaultGravidKravState } from './GravidKravState';

describe('GravidKrav', () => {
  it.each([
    { path: '/nb/gravid/krav', route: '/:language/gravid/krav', receipt: '/nb/gravid/krav/kvittering' },
    { path: '/en/gravid/krav', route: '/:language/gravid/krav', receipt: '/en/gravid/krav/kvittering' },
    { path: '/gravid/krav', route: '/gravid/krav', receipt: '/nb/gravid/krav/kvittering' }
  ])('replaces $path with $receipt after successful submission', async ({ path, route, receipt }) => {
    const consoleError = vi.spyOn(console, 'error');
    const router = createMemoryRouter(
      [
        { path: '/before', element: <div>Before form</div> },
        {
          path: route,
          element: <GravidKrav state={defaultGravidKravState({ kvittering: true, feilmeldinger: [] })} />
        },
        { path: receipt, element: <div>Receipt</div> }
      ],
      { initialEntries: ['/before', path], initialIndex: 1 }
    );

    try {
      render(<RouterProvider router={router} />);

      await waitFor(() => expect(router.state.location.pathname).toBe(receipt));
      expect(router.state.historyAction).toBe('REPLACE');
      expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(
        /Cannot update a component|You should call navigate\(\) in a React\.useEffect/
      );

      await act(() => router.navigate(-1));

      expect(router.state.location.pathname).toBe('/before');
    } finally {
      consoleError.mockRestore();
      router.dispose();
    }
  });

  it.each([false, true])('stays on the form with validation errors and serverError=%s', (serverError) => {
    const router = createMemoryRouter(
      [
        {
          path: '/nb/gravid/krav',
          element: (
            <GravidKrav
              state={defaultGravidKravState({
                kvittering: false,
                serverError,
                feilmeldinger: [{ skjemaelementId: 'fnr', feilmelding: 'Test validation error' }]
              })}
            />
          )
        }
      ],
      { initialEntries: ['/nb/gravid/krav'] }
    );
    render(<RouterProvider router={router} />);

    expect(router.state.historyAction).toBe('POP');
    expect(router.state.location.pathname).toBe('/nb/gravid/krav');
    router.dispose();
  });

  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <ArbeidsgiverProvider baseUrl={''}>
              <GravidKrav />
            </ArbeidsgiverProvider>
          </MemoryRouter>
        ))
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
