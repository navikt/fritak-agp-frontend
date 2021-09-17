import React, { createContext, useState, FC, ReactNode } from 'react';
import ValidationResponse from '../state/validation/ValidationResponse';
import GravidSoknadResponse from '../api/gravid/GravidSoknadResponse';

export type GravidSoknadKvitteringContextState = {
  response: ValidationResponse<GravidSoknadResponse> | undefined;
  saveResponse: (response: ValidationResponse<GravidSoknadResponse>) => void;
  clearResponse: () => void;
};

const contextDefaultValues: GravidSoknadKvitteringContextState = {
  response: undefined,
  saveResponse: () => {},
  clearResponse: () => {}
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

  const saveResponse = (response: ValidationResponse<GravidSoknadResponse>) => {
    setResponse(response);
  };

  const clearResponse = () => {
    setResponse(undefined);
  };

  return (
    <GravidSoknadKvitteringContext.Provider
      value={{
        response,
        saveResponse,
        clearResponse
      }}
    >
      {children}
    </GravidSoknadKvitteringContext.Provider>
  );
};

export default GravidSoknadKvitteringProvider;
