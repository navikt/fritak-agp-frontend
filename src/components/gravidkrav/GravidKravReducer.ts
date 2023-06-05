import { Actions, GravidKravAction } from './Actions';
import { validateGravidKrav } from './validateGravidKrav';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import mapResponse from '../../state/validation/mapResponse';
import mapKravFeilmeldinger from '../../validation/mapKravFeilmeldinger';
import { v4 as uuid } from 'uuid';
import { i18n } from 'i18next';
import pushFeilmelding from '../felles/Feilmeldingspanel/pushFeilmelding';
import parseISO from '../../utils/parseISO';

export const MAX_PERIODER = 50;

const checkItemId = (itemId?: string) => {
  if (itemId === undefined) {
    throw new Error('itemId kan ikke være undefined');
  }
};

const GravidKravReducer = (state: GravidKravState, action: GravidKravAction, translate: i18n): GravidKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  nextState.perioder = nextState.perioder
    ? nextState.perioder
    : [{ uniqueKey: uuid(), perioder: [{ uniqueKey: uuid() }] }];

  switch (action.type) {
    case Actions.Fnr:
      if (!nextState.formDirty) {
        nextState.formDirty = nextState.fnr !== payload?.fnr;
      }
      nextState.fnr = payload?.fnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Orgnr:
      if (!nextState.formDirty && state.orgnr && state.orgnr?.length > 0) {
        nextState.formDirty = nextState.orgnr !== payload?.orgnr;
      }
      nextState.orgnr = payload?.orgnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Fra:
      checkItemId(payload?.itemId);
      nextState.formDirty = true;

      nextState.perioder.forEach((arbeidsgiverperioder) => {
        arbeidsgiverperioder.perioder.forEach((delperiode) => {
          if (delperiode.uniqueKey === payload?.itemId) {
            delperiode.fom = payload.fra;
          }
        });
      });
      return validateGravidKrav(nextState, translate);

    case Actions.Til:
      checkItemId(payload?.itemId);
      nextState.formDirty = true;

      nextState.perioder.forEach((arbeidsgiverperioder) => {
        arbeidsgiverperioder.perioder.forEach((delperiode) => {
          if (delperiode.uniqueKey === payload?.itemId) {
            delperiode.tom = payload.til;
          }
        });
      });

      return validateGravidKrav(nextState, translate);

    case Actions.AddDelperiode: {
      checkItemId(payload?.itemId);
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)?.perioder.push({ uniqueKey: uuid() });

      // arbeidsgiverperiode?.perioder.push({ uniqueKey: uuid() });

      return validateGravidKrav(nextState, translate);
    }

    case Actions.SlettDelperiode: {
      checkItemId(payload?.itemId);

      nextState.perioder.forEach((arbeidsgiverperiode) => {
        arbeidsgiverperiode.perioder = arbeidsgiverperiode.perioder.filter(
          (delperiode) => delperiode.uniqueKey !== payload?.itemId
        );
      });
      return validateGravidKrav(nextState, translate);
    }

    case Actions.Dager:
      checkItemId(payload?.itemId);
      nextState.formDirty = true;
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.dager = payload?.dager;

      return validateGravidKrav(nextState, translate);

    case Actions.Beloep:
      checkItemId(payload?.itemId);
      nextState.formDirty = true;
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.belop = payload?.belop;

      return validateGravidKrav(nextState, translate);

    case Actions.Sykemeldingsgrad:
      checkItemId(payload?.itemId);
      nextState.formDirty = true;
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.sykemeldingsgrad =
        payload?.sykemeldingsgrad;

      return validateGravidKrav(nextState, translate);

    case Actions.Bekreft:
      if (!nextState.formDirty) {
        nextState.formDirty = nextState.bekreft !== payload?.bekreft;
      }
      nextState.bekreft = payload?.bekreft;
      return validateGravidKrav(nextState, translate);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateGravidKrav(nextState, translate);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateGravidKrav(nextState, translate);

    case Actions.Validate: {
      nextState.validated = true;
      const validatedState = validateGravidKrav(nextState, translate);
      validatedState.submitting = validatedState.feilmeldinger?.length === 0;
      validatedState.progress = validatedState.submitting;
      return validatedState;
    }

    case Actions.HandleResponse:
      if (payload?.response == undefined) {
        throw new Error('Du må spesifisere response');
      }
      nextState.validated = false;
      nextState.progress = false;
      nextState.submitting = false;
      nextState.showSpinner = false;
      return mapResponse(payload.response, nextState, mapKravFeilmeldinger) as GravidKravState;

    case Actions.Grunnbeloep: {
      checkItemId(payload?.itemId);

      const gItem = nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId);

      if (gItem) {
        gItem.grunnbeloep = payload?.grunnbeloep ? payload.grunnbeloep : undefined;
      }

      return nextState;
    }

    case Actions.antallDager:
      nextState.antallDager = payload?.antallDager;
      return validateGravidKrav(nextState, translate);

    case Actions.Reset:
      return Object.assign({}, defaultGravidKravState());

    case Actions.AddPeriode: {
      if (nextState.perioder.length >= MAX_PERIODER) {
        return nextState;
      }

      nextState.perioder = nextState.perioder
        ? nextState.perioder.concat({ uniqueKey: uuid(), perioder: [{ uniqueKey: uuid() }] })
        : [{ uniqueKey: uuid(), perioder: [{ uniqueKey: uuid() }] }];
      return nextState;
    }

    case Actions.DeletePeriode:
      checkItemId(payload?.itemId);
      nextState.perioder = state.perioder?.filter((i) => i.uniqueKey !== payload!!.itemId);
      return validateGravidKrav(nextState, translate);

    case Actions.NotAuthorized:
      nextState.notAuthorized = false;
      return nextState;

    case Actions.KravEndring: {
      if (payload?.krav) {
        const krav = payload.krav;
        nextState.fnr = krav.identitetsnummer;
        nextState.orgnr = krav.virksomhetsnummer;
        nextState.antallDager = krav.antallDager;
        nextState.perioder = formaterPerioderFraBackend(krav.perioder);
        nextState.kravId = krav.id;
        nextState.endringskrav = true;
      }

      return nextState;
    }

    case Actions.AddBackendError: {
      const eksisterendeFeilmelding = state.feilmeldinger.find(
        (feilmelding) => feilmelding.feilmelding === payload?.error
      );
      if (payload?.error && !eksisterendeFeilmelding) {
        pushFeilmelding('backend-' + uuid(), payload.error, nextState.feilmeldinger);
      }
      return nextState;
    }

    case Actions.RemoveBackendError:
      nextState.feilmeldinger = nextState.feilmeldinger.filter(
        (feilmelding) => !feilmelding.skjemaelementId.startsWith('#backend')
      );
      return nextState;

    case Actions.EndringsAarsak: {
      if (payload?.endringsAarsak) {
        nextState.endringsAarsak = payload.endringsAarsak;
      } else {
        nextState.endringsAarsak = undefined;
      }
      return nextState;
    }

    case Actions.ShowSpinner:
      nextState.showSpinner = true;
      return nextState;

    case Actions.HideSpinner:
      nextState.showSpinner = false;
      return nextState;

    case Actions.HideServerError:
      nextState.serverError = false;
      return nextState;

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export function formaterPerioderFraBackend(perioder) {
  return perioder.map((periode) => ({
    uniqueKey: uuid(),
    perioder: formaterGammelEllerNyPeriode(periode),
    dager: Number(periode.antallDagerMedRefusjon),
    belop: Number(periode.månedsinntekt),
    sykemeldingsgrad: (periode.gradering * 100).toString()
  }));
}

function formaterGammelEllerNyPeriode(perioder) {
  if (perioder.perioder) {
    return perioder.perioder.map((delperiode) => ({
      uniqueKey: uuid(),
      fom: parseISO(delperiode.fom),
      tom: parseISO(delperiode.tom)
    }));
  } else {
    return [
      {
        uniqueKey: uuid(),
        fom: parseISO(perioder.fom),
        tom: parseISO(perioder.tom)
      }
    ];
  }
}

export default GravidKravReducer;
