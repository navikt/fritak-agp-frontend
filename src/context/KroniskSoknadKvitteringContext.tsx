import React, { createContext, useState, FC, ReactNode, useMemo } from 'react';
import ValidationResponse from '../state/validation/ValidationResponse';
import KroniskSoknadResponse from '../api/kronisk/KroniskSoknadResponse';

export interface KroniskSoknadKvitteringContextState {
  response: ValidationResponse<KroniskSoknadResponse> | undefined;
  saveResponse: (response: ValidationResponse<KroniskSoknadResponse>) => void;
  clearResponse: () => void;
}

const contextDefaultValues: KroniskSoknadKvitteringContextState = {
  response: undefined,
  saveResponse: () => {
    // This is intentional
  },
  clearResponse: () => {
    // This is intentional
  }
};

export const KroniskSoknadKvitteringContext = createContext<KroniskSoknadKvitteringContextState>(contextDefaultValues);

interface KroniskSoknadKvitteringProviderProps {
  children: ReactNode;
}

const KroniskSoknadKvitteringProvider: FC<KroniskSoknadKvitteringProviderProps> = ({
  children
}: KroniskSoknadKvitteringProviderProps) => {
  const [response, setResponse] = useState<ValidationResponse<KroniskSoknadResponse> | undefined>(
    contextDefaultValues.response
  );

  const saveResponse = (responseData: ValidationResponse<KroniskSoknadResponse>) => {
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
    <KroniskSoknadKvitteringContext.Provider value={initialValues}>{children}</KroniskSoknadKvitteringContext.Provider>
  );
};

export default KroniskSoknadKvitteringProvider;
