import React, { createContext, useState, FC, ReactNode, useMemo } from 'react';
import ValidationResponse from '../state/validation/ValidationResponse';
import GravidSoknadResponse from '../api/gravid/GravidSoknadResponse';

export interface GravidSoknadKvitteringContextState {
  response: ValidationResponse<GravidSoknadResponse> | undefined;
  saveResponse: (response: ValidationResponse<GravidSoknadResponse>) => void;
  clearResponse: () => void;
}

const contextDefaultValues: GravidSoknadKvitteringContextState = {
  response: undefined,
  saveResponse: () => {
    // This is intentional
  },
  clearResponse: () => {
    // This is intentional
  }
};

export const GravidSoknadKvitteringContext = createContext<GravidSoknadKvitteringContextState>(contextDefaultValues);

interface GravidSoknadKvitteringProviderProps {
  children: ReactNode;
}

const GravidSoknadKvitteringProvider: FC<GravidSoknadKvitteringProviderProps> = ({
  children
}: GravidSoknadKvitteringProviderProps) => {
  const [response, setResponse] = useState<ValidationResponse<GravidSoknadResponse> | undefined>(
    contextDefaultValues.response
  );

  const saveResponse = (responseData: ValidationResponse<GravidSoknadResponse>) => {
    setResponse(responseData);
  };

  const clearResponse = () => {
    setResponse(undefined);
  };

  const initialValues = useMemo(
    () => ({
      response,
      saveResponse,
      clearResponse
    }),
    [response, saveResponse, clearResponse]
  );

  return (
    <GravidSoknadKvitteringContext.Provider value={initialValues}>{children}</GravidSoknadKvitteringContext.Provider>
  );
};

export default GravidSoknadKvitteringProvider;
