import React, { useContext, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GravidSoknadKvitteringProvider, { GravidSoknadKvitteringContext } from './GravidSoknadKvitteringContext';
import { ValidationResponse } from '../state/validation/ValidationResponse';
import GravidSoknadResponse from '../api/gravid/GravidSoknadResponse';

describe('GravidSoknadKvitteringContext', () => {
  it('should set the response', async () => {
    const mockResponse: ValidationResponse<GravidSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse } = useContext(GravidSoknadKvitteringContext);

      useEffect(() => {
        saveResponse(mockResponse);
      }, []);

      return <>{response?.title}</>;
    };

    render(
      <GravidSoknadKvitteringProvider>
        <MockConsumer />
      </GravidSoknadKvitteringProvider>
    );

    await waitFor(() => expect(screen.getByText('Banana')).toBeInTheDocument());
  });

  it('should set and clear the response', async () => {
    const mockResponse: ValidationResponse<GravidSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse, clearResponse } = useContext(GravidSoknadKvitteringContext);

      useEffect(() => {
        saveResponse(mockResponse);
        clearResponse();
      }, []);

      return <>{response?.title}</>;
    };

    render(
      <GravidSoknadKvitteringProvider>
        <MockConsumer />
      </GravidSoknadKvitteringProvider>
    );

    await waitFor(() => expect(screen.queryByText('Banana')).toBeNull());
  });
});
