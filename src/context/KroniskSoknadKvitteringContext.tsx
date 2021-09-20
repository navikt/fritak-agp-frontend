import React, { createContext, useState, FC, ReactNode } from 'react';
import ValidationResponse from '../state/validation/ValidationResponse';
import KroniskSoknadResponse from '../api/kronisk/KroniskSoknadResponse';

export type KroniskSoknadKvitteringContextState = {
  response: ValidationResponse<KroniskSoknadResponse> | undefined;
  saveResponse: (response: ValidationResponse<KroniskSoknadResponse>) => void;
  clearResponse: () => void;
};

const contextDefaultValues: KroniskSoknadKvitteringContextState = {
  response: undefined,
  saveResponse: () => {},
  clearResponse: () => {}
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

  const saveResponse = (response: ValidationResponse<KroniskSoknadResponse>) => {
    setResponse(response);
  };

  const clearResponse = () => {
    setResponse(undefined);
  };

  return (
    <KroniskSoknadKvitteringContext.Provider
      value={{
        response,
        saveResponse,
        clearResponse
      }}
    >
      {children}
    </KroniskSoknadKvitteringContext.Provider>
  );
};

export default KroniskSoknadKvitteringProvider;
