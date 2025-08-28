import React from 'react';
import './LeggTilKnapp.sass';
import { Button, ButtonProps } from '@navikt/ds-react';

type LeggTilProps = Omit<ButtonProps, 'variant'>;

const LeggTilKnapp = (props: LeggTilProps) => (
  <Button
    variant='tertiary'
    className={'leggtil-knapp ' + props.className}
    onClick={(evt) => props.onClick && props.onClick(evt)}
  >
    {props.children}
  </Button>
);

export default LeggTilKnapp;
