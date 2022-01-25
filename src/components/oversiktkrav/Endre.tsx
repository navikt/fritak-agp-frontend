import { Link } from '@navikt/ds-react';
import '@navikt/ds-css';
import React from 'react';
import { Edit } from '@navikt/ds-icons';

export default function Endre() {
  return (
    <Link>
      <Edit fr='5%' /> Endre
    </Link>
  );
}
