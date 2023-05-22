import React, { createContext, useContext, useEffect, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI from '../../api/arbeidsgiver/ArbeidsgiverAPI';
import ArbeidsgiverStatus from './ArbeidsgiverStatus';
import ArbeidsgiverInterface from './ArbeidsgiverInterface';
import buildArbeidsgiver from './buildArbeidsgiver';
import { Loader } from '@navikt/ds-react';

const buildArbeidsgiverContext = (firma: string, arbeidsgiverId: string, arbeidsgivere: Organisasjon[]) =>
  ({
    arbeidsgivere,
    firma,
    arbeidsgiverId
  } as ArbeidsgiverInterface);

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
    return <Loader size='3xlarge' title='Laster data' className='arbeidsgiver-context-spinner' />;
  }

  return (
    <ArbeidsgiverContext.Provider
      value={{
        arbeidsgivere,
        setArbeidsgivere,
        firma,
        setFirma,
        arbeidsgiverId,
        setArbeidsgiverId
      }}
    >
      {props.children}
    </ArbeidsgiverContext.Provider>
  );
};

export { buildArbeidsgiverContext, buildArbeidsgiver, useArbeidsgiver, ArbeidsgiverProvider };
