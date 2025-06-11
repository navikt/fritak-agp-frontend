import React, { createContext, useContext, useEffect, useState, useMemo, PropsWithChildren } from 'react';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import ArbeidsgiverAPI from '../../api/arbeidsgiver/ArbeidsgiverAPI';
import ArbeidsgiverInterface from './ArbeidsgiverInterface';
import { Loader } from '@navikt/ds-react';
import HttpStatus from '../../api/HttpStatus';

const buildArbeidsgiverContext = (firma: string, arbeidsgiverId: string, arbeidsgivere: Organisasjon[]) =>
  ({
    arbeidsgivere,
    firma,
    arbeidsgiverId
  }) as ArbeidsgiverInterface;

const ArbeidsgiverContext = createContext(buildArbeidsgiverContext('', '', []));

interface ArbeidsgiverContextProviderProps {
  status?: HttpStatus;
  arbeidsgivere?: Organisasjon[];
  firma?: string;
  arbeidsgiverId?: string;
  baseUrl: string;
}

const useArbeidsgiver = () => useContext(ArbeidsgiverContext);

const ArbeidsgiverProvider = (props: PropsWithChildren<ArbeidsgiverContextProviderProps>) => {
  const [loadingStatus, setLoadingStatus] = useState<number>(props.status || HttpStatus.NotStarted);
  const [arbeidsgivere, setArbeidsgivere] = useState<Organisasjon[]>(props.arbeidsgivere || []);
  const [firma, setFirma] = useState<string>(props.firma || '');
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>(props.arbeidsgiverId || '');

  useEffect(() => {
    if (loadingStatus == HttpStatus.NotStarted) {
      setLoadingStatus(HttpStatus.Started);
      ArbeidsgiverAPI.GetArbeidsgivere(props.baseUrl).then((res) => {
        setLoadingStatus(res.status);
        setArbeidsgivere(res.organisasjoner);
      });
    }
  }, [loadingStatus, props.baseUrl]);

  const initialValues = useMemo(
    () => ({
      arbeidsgivere,
      setArbeidsgivere,
      firma,
      setFirma,
      arbeidsgiverId,
      setArbeidsgiverId
    }),
    [arbeidsgivere, setArbeidsgivere, firma, setFirma, arbeidsgiverId, setArbeidsgiverId]
  );

  if (loadingStatus === HttpStatus.NotStarted || loadingStatus === HttpStatus.Started) {
    return <Loader size='3xlarge' title='Laster data' className='arbeidsgiver-context-spinner' />;
  }

  return <ArbeidsgiverContext.Provider value={initialValues}>{props.children}</ArbeidsgiverContext.Provider>;
};

export { useArbeidsgiver, ArbeidsgiverProvider };
