import React, { useContext, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GravidSoknadKvitteringProvider, { KroniskSoknadKvitteringContext } from './KroniskSoknadKvitteringContext';
import { ValidationResponse } from '../state/validation/ValidationResponse';
import KroniskSoknadResponse from '../api/kronisk/KroniskSoknadResponse';

describe('KroniskSoknadKvitteringContext', () => {
  it('should set the response', async () => {
    const mockResponse: ValidationResponse<KroniskSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse } = useContext(KroniskSoknadKvitteringContext);

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
    const mockResponse: ValidationResponse<KroniskSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse, clearResponse } = useContext(KroniskSoknadKvitteringContext);

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
