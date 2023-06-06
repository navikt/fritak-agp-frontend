import { GravidKravPeriode } from '../gravidkrav/GravidKravState';
import { KroniskKravPeriode } from './KroniskKravState';

export default function kroniskKravKanSlettes(
  perioder: Array<GravidKravPeriode | KroniskKravPeriode> | undefined
): boolean {
  return !!(perioder && perioder.length > 1);
}
