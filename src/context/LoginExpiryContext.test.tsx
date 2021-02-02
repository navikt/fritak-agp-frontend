import React from 'react';
import TestRenderer from 'react-test-renderer';
import LoginExpiryProvider, { LoginExpiryProgress } from './LoginExpiryContext';

describe('LoginExpiryContext', () => {
  const mockFetch = (status: number, json: any) => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve(({
        status: status,
        json: () => Promise.resolve(json)
      } as unknown) as Response)
    );
  };

  beforeEach(() => {
    mockFetch(200, {
      status: 200,
      json: '123000456'
    });
  });

  it('should fetch expiry date', () => {
    expect(
      TestRenderer.create(<LoginExpiryProvider>ChildrenHere</LoginExpiryProvider>).root.findByType(LoginExpiryProgress)
    );
  });

  it('should show progress', () => {
    expect(
      TestRenderer.create(<LoginExpiryProvider status={1}>ChildrenHere</LoginExpiryProvider>).root.findByType(
        LoginExpiryProgress
      )
    );
  });

  it('should show children', () => {
    expect(TestRenderer.create(<LoginExpiryProvider status={2}>ChildrenHere</LoginExpiryProvider>).toJSON()).toContain(
      'ChildrenHere'
    );
  });
});
