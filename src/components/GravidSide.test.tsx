import React from 'react'
import GravidSide from "./GravidSide";
import {render, unmountComponentAtNode} from "react-dom";

describe('GravidSide', () => {

  let container:Element = document.createElement('div');

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement('div');
  });


  it('skal vise feilmelding for ugyldig fødselsnummer - validert', () => {
    render(
      <GravidSide fnr="123" validated={true}/>
      , container
    );
    expect(container.textContent).toContain('Ugyldig fødselsnummer');
  })

  it('skal ikke vise feilmelding for ugyldig fødselsnummer - ikke validert', () => {
    render(
      <GravidSide fnr="123" validated={false}/>
      , container
    );
    expect(container.textContent).not.toContain('Ugyldig fødselsnummer');
  })

});
