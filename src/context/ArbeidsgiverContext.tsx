import React, { createContext, useContext, useEffect, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI from '../api/arbeidsgiver/ArbeidsgiverAPI';
import Spinner from 'nav-frontend-spinner';

interface ArbeidsgiverInterface {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: any;
  firma: string;
  setFirma: any;
  arbeidsgiverId: string;
  setArbeidsgiverId: any;
}

const buildArbeidsgiverContext = (firma: string, arbeidsgiverId: string, arbeidsgivere: Organisasjon[]) =>
  ({
    arbeidsgivere,
    firma,
    arbeidsgiverId
  } as ArbeidsgiverInterface);

const buildArbeidsgiver = (
  Name: string,
  OrganizationForm: string,
  OrganizationNumber: string,
  ParentOrganizationNumber: string,
  Status: string,
  Type: string
): Organisasjon => {
  return {
    Name,
    OrganizationForm,
    OrganizationNumber,
    ParentOrganizationNumber,
    Status,
    Type
  };
};

const ArbeidsgiverContext = createContext(buildArbeidsgiverContext('', '', []));

interface ArbeidsgiverContextProviderProps {
  children: any;
  status?: ArbeidsgiverStatus;
  arbeidsgivere?: Organisasjon[];
  firma?: string;
  arbeidsgiverId?: string;
  baseUrl: string;
}

const useArbeidsgiver = () => useContext(ArbeidsgiverContext);

export enum ArbeidsgiverStatus {
  NotStarted = -1,
  Started = 1,
  Successfully = 200,
  Unknown = -2,
  Timeout = -3,
  Error = 500,
  Unauthorized = 401
}

const ArbeidsgiverProvider = (props: ArbeidsgiverContextProviderProps) => {
  const [loadingStatus, setLoadingStatus] = useState<number>(props.status || ArbeidsgiverStatus.NotStarted);
  const [arbeidsgivere, setArbeidsgivere] = useState<Organisasjon[]>(props.arbeidsgivere || []);
  const [firma, setFirma] = useState<string>(props.firma || '');
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>(props.arbeidsgiverId || '');
  const [ready, setReady] = useState<boolean>();

  useEffect(() => {
    if (loadingStatus == ArbeidsgiverStatus.NotStarted) {
      setLoadingStatus(ArbeidsgiverStatus.Started);
      ArbeidsgiverAPI.GetArbeidsgivere(props.baseUrl).then((res) => {
        setLoadingStatus(res.status);
        setArbeidsgivere(res.organisasjoner);
        setReady(ready);
      });
    }
  }, [loadingStatus, ready, props.baseUrl]);

  if (loadingStatus === ArbeidsgiverStatus.NotStarted || loadingStatus === ArbeidsgiverStatus.Started) {
    return <Spinner type={'XXL'} className='arbeidsgiver-context-spinner' />;
  }

  return (
    <ArbeidsgiverContext.Provider
      value={{ arbeidsgivere, setArbeidsgivere, firma, setFirma, arbeidsgiverId, setArbeidsgiverId }}
    >
      {props.children}
    </ArbeidsgiverContext.Provider>
  );
};

export { buildArbeidsgiverContext, buildArbeidsgiver, useArbeidsgiver, ArbeidsgiverProvider };
