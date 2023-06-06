import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@navikt/ds-react';

interface InternLenkeProps {
  to?: string;
  children?: any;
  className?: string;
  onClick?: any;
  onKeyDown?: any;
}

export const InternLenke: React.FC<InternLenkeProps> = ({
  to,
  children,
  className,
  onClick,
  onKeyDown
}: InternLenkeProps) => {
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
