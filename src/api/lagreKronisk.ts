import ValidationResponse from './ValidationResponse';
import ArbeidType from '../components/kronisk/ArbeidType';
import PaakjenningerType from '../components/kronisk/PaakjenningerType';
import Aarsfravaer from '../components/kronisk/Aarsfravaer';
import shortMonthName from './shortMonthName';
import postRequest from './postRequest';

export interface KroniskRequest {
  orgnr?: string;
  fnr?: string;
  arbeidstyper?: ArbeidType[];
  paakjenningstyper?: PaakjenningerType[];
  paakjenningBeskrivelse?: string;
  aarsFravaer?: Aarsfravaer[];
  bekreftet?: boolean;
  dokumentasjon?: string;
}

interface FravaerData {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

interface lagreKroniskRequest {
  orgnr: string;
  fnr: string;
  arbeidstyper: ArbeidType[];
  paakjenningstyper: PaakjenningerType[];
  paakjenningBeskrivelse?: string;
  fravaer: FravaerData[];
  bekreftet: boolean;
  dokumentasjon?: string;
}

export interface lagreKroniskBackendError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

const convertToMonthYear = (fravaer): FravaerData[] => {
  if (!fravaer) {
    return [];
  }

  return fravaer.flatMap((aarsfravaer) => {
    const year = aarsfravaer.year;
    const monthDays = Object.keys(aarsfravaer);
    monthDays.splice(monthDays.indexOf('year'), 1);

    return monthDays.map((monthName) => {
      const dayNr = '00' + (shortMonthName.indexOf(monthName) + 1);
      const paddedDayNr = dayNr.substring(dayNr.length - 2, dayNr.length);
      return {
        yearMonth: `${year}-${paddedDayNr}`,
        antallDagerMedFravaer: aarsfravaer[monthName]
      };
    });
  });
};

const mapKroniskRequest = (payload: KroniskRequest): lagreKroniskRequest => {
  const postParams: lagreKroniskRequest = {
    fnr: payload.fnr || '',
    orgnr: payload.orgnr || '',
    bekreftet: payload.bekreftet || false,
    arbeidstyper: payload.arbeidstyper || [],
    paakjenningstyper: payload.paakjenningstyper || [],
    fravaer: convertToMonthYear(payload.aarsFravaer)
  };

  if (payload.dokumentasjon) {
    postParams.dokumentasjon = payload.dokumentasjon;
  }

  if (payload.paakjenningBeskrivelse) {
    postParams.paakjenningBeskrivelse = payload.paakjenningBeskrivelse;
  }

  return postParams;
};

const lagreKronisk = (
  basePath: string,
  payload: KroniskRequest
): Promise<ValidationResponse> => {
  return postRequest(
    basePath + '/api/v1/kronisk/soeknad',
    mapKroniskRequest(payload)
  );
};

export default lagreKronisk;
