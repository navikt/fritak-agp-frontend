import React, { createContext, useContext, useEffect, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI, { Status } from '../api/ArbeidsgiverAPI';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

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
  status?: Status;
  arbeidsgivere?: Organisasjon[];
  firma?: string;
  arbeidsgiverId?: string;
  basePath: string;
}

const useArbeidsgiver = () => useContext(ArbeidsgiverContext);

const ArbeidsgiverProvider = (props: ArbeidsgiverContextProviderProps) => {
  const [status, setStatus] = useState<number>(props.status || Status.NotStarted);
  const [arbeidsgivere, setArbeidsgivere] = useState<Organisasjon[]>(props.arbeidsgivere || []);
  const [firma, setFirma] = useState<string>(props.firma || '');
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>(props.arbeidsgiverId || '');
  const [ready, setReady] = useState<boolean>();

  useEffect(() => {
    if (status == Status.NotStarted) {
      setStatus(Status.Started);
      ArbeidsgiverAPI.GetArbeidsgivere(props.basePath).then((res) => {
        setStatus(res.status);
        setArbeidsgivere(res.organisasjoner);
        setReady(ready);
      });
    }
  }, [status, ready, props.basePath]);

  if (status === Status.NotStarted || status === Status.Started) {
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
