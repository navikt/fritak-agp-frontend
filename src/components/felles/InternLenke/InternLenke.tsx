import React, { PropsWithChildren, MouseEvent, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@navikt/ds-react';

interface InternLenkeProps {
  to?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export const InternLenke = ({ to, children, className, onClick, onKeyDown }: PropsWithChildren<InternLenkeProps>) => {
  const classes: string = ('lenke ' + className).trim();
  const linkTo = to || '';
  if (to) {
    return (
      <Link className={classes} to={linkTo}>
        {children}
      </Link>
    );
  } else {
    return (
      <Button variant='tertiary' className={'intern-lenke ' + className} onClick={onClick} onKeyDown={onKeyDown}>
        {children}
      </Button>
    );
  }
};

export default InternLenke;
