import React, { useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { Feiloppsummering, FnrInput } from 'nav-frontend-skjema';
import { ArbeidType } from './ArbeidType';

const KroniskSide = (props: KroniskState) => {
  const [state, dispatch] = useReducer(KroniskReducer, {}, defaultKroniskState);
  const { fnr, fnrError, feilmeldinger } = state;
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Kronisk</Innholdstittel>
        </Panel>
        <Panel>
          <FnrInput
            value={fnr}
            onValidate={() => {}}
            onChange={(evt) =>
              dispatch({
                type: Actions.Fnr,
                payload: {
                  fnr: evt.currentTarget.value
                }
              })
            }
            feil={fnrError}
          />
        </Panel>
        <Panel>
          {feilmeldinger?.length && (
            <Feiloppsummering
              tittel='For å gå videre må du rette opp følgende:'
              feil={feilmeldinger}
            />
          )}
        </Panel>
        <Panel>
          <button
            onClick={() =>
              dispatch({
                type: Actions.ToggleArbeid,
                payload: { arbeid: ArbeidType.Krevende }
              })
            }
          >
            Arbeid
          </button>

          <button
            onClick={() =>
              dispatch({
                type: Actions.Fravær,
                payload: { fravær: { year: 2018, month: 10, dager: 2 } }
              })
            }
          >
            År 1 Mnd 10 Dag 5 = 0
          </button>

          <button onClick={() => dispatch({ type: Actions.Validate })}>
            Validate
          </button>
          <button onClick={() => dispatch({ type: Actions.Reset })}>
            Reset
          </button>
        </Panel>
      </Column>
    </Row>
  );
};

export default KroniskSide;
