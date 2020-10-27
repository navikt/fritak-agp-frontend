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


  it('skal vise feilmelding for ugyldig fødselsnummer', () => {
    render(
      <GravidSide fnr="123"/>
      , container
    );
    expect(container.textContent).toContain('Ugyldig fødselsnummer');
  })

});
