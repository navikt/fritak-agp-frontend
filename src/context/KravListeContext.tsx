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
  setKrav: () => {},
  clearKrav: () => {},
  clearAktivtKrav: () => {},
  setAktivtKrav: () => {},
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

  const finnAktivtKrav = (kravListe, kravId: string): KravRad => {
    const kravKeys = Object.keys(kravListe);

    const tmpKravData = kravKeys
      .map((key) => {
        const krav = kravListe[key].find((rad): boolean => rad.id === kravId);

        if (krav) {
          krav.kravType = key;
        }

        return krav;
      })
      .flat();

    const retval = tmpKravData.find((krave) => !!krave);

    return retval;
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
