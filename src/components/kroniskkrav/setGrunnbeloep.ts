import { Payload } from './Actions';
import KroniskKravState from './KroniskKravState';

const setGrunnbeloep = (payload: Payload | undefined, nextState: KroniskKravState) => {
  if (payload?.grunnbeloep) {
    const aarsGrunnbeloep = payload.grunnbeloep * 6;
    const dagsGrunnbeloep = aarsGrunnbeloep / 260;
    nextState.gDagsbeloep = dagsGrunnbeloep;
  } else {
    nextState.gDagsbeloep = undefined;
  }
};

export default setGrunnbeloep;
