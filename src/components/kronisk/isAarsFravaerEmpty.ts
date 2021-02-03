import { Aarsfravaer } from './Aarsfravaer';

export const isAarsFravaerEmpty = (aar: Aarsfravaer): boolean => {
  return (
    aar.jan == undefined &&
    aar.feb == undefined &&
    aar.mar == undefined &&
    aar.apr == undefined &&
    aar.mai == undefined &&
    aar.jun == undefined &&
    aar.jul == undefined &&
    aar.aug == undefined &&
    aar.sep == undefined &&
    aar.okt == undefined &&
    aar.nov == undefined &&
    aar.des == undefined
  );
};
