import ArbeidType from '../../components/kronisk/ArbeidType';
import PaakjenningerType from '../../components/kronisk/PaakjenningerType';

export interface FravaerData {
  yearMonth: string;
  antallDagerMedFravaer: number;
}

export interface KroniskRequest {
  virksomhetsnummer: string;
  identitetsnummer: string;
  arbeidstyper: ArbeidType[];
  paakjenningstyper: PaakjenningerType[];
  paakjenningBeskrivelse?: string;
  fravaer: FravaerData[];
  bekreftet: boolean;
  dokumentasjon?: string;
}
