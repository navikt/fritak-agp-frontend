import React from 'react';
import { Button } from '@navikt/ds-react';
import { Delete } from '@navikt/ds-icons';

interface ButtonSletteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

export default function ButtonSlette(props: ButtonSletteProps) {
  return (
    <Button
      className={props.className}
      onClick={props.onClick}
      variant='tertiary'
      icon={<Delete title={props.title} />}
      disabled={props.disabled}
    />
  );
}
