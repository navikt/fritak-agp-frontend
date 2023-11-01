import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/vi-dom';
import GravidSoknadKvitteringProvider, { GravidSoknadKvitteringContext } from './GravidSoknadKvitteringContext';
import ValidationResponse from '../state/validation/ValidationResponse';
import GravidSoknadResponse from '../api/gravid/GravidSoknadResponse';

describe('GravidSoknadKvitteringContext', () => {
  it('should set the response', () => {
    const mockResponse: ValidationResponse<GravidSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse } = useContext(GravidSoknadKvitteringContext);

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
    const mockResponse: ValidationResponse<GravidSoknadResponse> = {
      violations: [{ validationType: 'string', message: 'string', propertyPath: 'string' }],
      status: 200,
      title: 'Banana'
    };

    const MockConsumer = () => {
      const { response, saveResponse, clearResponse } = useContext(GravidSoknadKvitteringContext);

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
