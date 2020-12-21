import React, { useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import KroniskState from './KroniskState';
import KroniskReducer, {
  defaultKroniskState,
  KroniskActionType
} from './KroniskReducer';

const KroniskSide = (props: KroniskState) => {
  const [state, dispatch] = useReducer(KroniskReducer, {}, defaultKroniskState);
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Kronisk</Innholdstittel>
        </Panel>
        <Panel>
          <Input
            defaultValue={state.fnr}
            onChange={(evt) =>
              dispatch({
                type: KroniskActionType.Fnr,
                payload: evt.currentTarget.value
              })
            }
          />
        </Panel>
        <Panel>
          <button
            onClick={() => dispatch({ type: KroniskActionType.Validate })}
          >
            Validate
          </button>
          <button onClick={() => dispatch({ type: KroniskActionType.Reset })}>
            Reset
          </button>
        </Panel>
      </Column>
    </Row>
  );
};

export default KroniskSide;
