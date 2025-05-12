import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import GravidSoknadKvitteringProvider, { KroniskSoknadKvitteringContext } from './KroniskSoknadKvitteringContext';
import { ValidationResponse } from '../state/validation/ValidationResponse';
import KroniskSoknadResponse from '../api/kronisk/KroniskSoknadResponse';

describe('KroniskSoknadKvitteringContext', () => {
  it('should set the response', () => {
    const mockResponse: ValidationResponse<KroniskSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse } = useContext(KroniskSoknadKvitteringContext);

      saveResponse(mockResponse);

      return <>{response?.title}</>;
    };

    render(
      <GravidSoknadKvitteringProvider>
        <MockConsumer />
      </GravidSoknadKvitteringProvider>
    );

    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('should set and clear the response', () => {
    const mockResponse: ValidationResponse<KroniskSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse, clearResponse } = useContext(KroniskSoknadKvitteringContext);

      saveResponse(mockResponse);

      clearResponse();

      return <>{response?.title}</>;
    };

    render(
      <GravidSoknadKvitteringProvider>
        <MockConsumer />
      </GravidSoknadKvitteringProvider>
    );

    expect(screen.queryByText('Banana')).toBeNull();
  });
});
