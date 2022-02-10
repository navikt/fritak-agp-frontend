import '@navikt/ds-css';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import { Link } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import Language from '../../locale/Language';

interface EndreProps {
  kravtype: string;
  onClick?: any;
}

export default function Endre(props: EndreProps) {
  const lenkemal = props.kravtype === 'gravidKrav' ? lenker.GravidKrav : lenker.KroniskKrav;
  const tilLenke = buildLenke(lenkemal, Language.nb);
  return (
    <Link to={tilLenke} onClick={props.onClick}>
      <Edit fr='5%' /> Endre
    </Link>
  );
}
