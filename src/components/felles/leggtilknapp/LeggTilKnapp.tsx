import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import './LeggTilKnapp.sass';

interface LeggTilProps {
  children: any;
  onClick: any;
  className?: string;
}

const LeggTilKnapp = (props: LeggTilProps) => (
  <Flatknapp className={'leggtil-knapp ' + props.className} onClick={(evt) => props.onClick(evt)}>
    {props.children}
  </Flatknapp>
);

export default LeggTilKnapp;
