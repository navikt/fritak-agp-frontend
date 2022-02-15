import React, { createContext, useState, FC, ReactNode } from 'react';
import { KravRad } from '../components/oversiktkrav/tilpassOversiktKrav';

export type KravListeContextState = {
  kravListe: any | undefined;
  setKrav: (response: any) => void;
  clearKrav: () => void;
  clearAktivtKrav: () => void;
  setAktivtKrav: any;
  aktivtKrav: any;
};

const contextDefaultValues: KravListeContextState = {
  kravListe: undefined,
  setKrav: () => {
    // This is intentional
  },
  clearKrav: () => {
    // This is intentional
  },
  clearAktivtKrav: () => {
    // This is intentional
  },
  setAktivtKrav: () => {
    // This is intentional
  },
  aktivtKrav: undefined
};

export const KravListeContext = createContext<KravListeContextState>(contextDefaultValues);

interface GravidSoknadKvitteringProviderProps {
  children: ReactNode;
}

const GravidSoknadKvitteringProvider: FC<GravidSoknadKvitteringProviderProps> = ({
  children
}: GravidSoknadKvitteringProviderProps) => {
  const [kravListe, setKravList] = useState<any | undefined>();

  const [aktivtKravData, setAktivtKravData] = useState<KravRad | undefined>(undefined);

  const setKrav = (response: any) => {
    setKravList(response);
  };

  const clearKrav = () => {
    setKravList(undefined);
  };

  const clearAktivtKrav = () => {
    setAktivtKravData(undefined);
  };

  const finnAktivtKrav = (alleKravListe, kravId: string): KravRad => {
    const kravKeys = Object.keys(alleKravListe);

    const tmpKravData = kravKeys
      .map((key) => {
        const krav = alleKravListe[key].find((rad): boolean => rad.id === kravId);

        if (krav) {
          krav.kravType = key;
        }

        return krav;
      })
      .flat();

    return tmpKravData.find((krave) => !!krave);
  };

  const setAktivtKrav = (kravId: string) => {
    const aktivtKrav = finnAktivtKrav(kravListe, kravId);
    setAktivtKravData(aktivtKrav);
  };

  return (
    <KravListeContext.Provider
      value={{
        kravListe,
        setKrav,
        clearKrav,
        clearAktivtKrav,
        setAktivtKrav,
        aktivtKrav: aktivtKravData
      }}
    >
      {children}
    </KravListeContext.Provider>
  );
};

export default GravidSoknadKvitteringProvider;
