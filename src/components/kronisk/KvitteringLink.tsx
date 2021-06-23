import { Redirect, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import React from 'react';
import PathParams from '../../locale/PathParams';

const KvitteringLink = () => {
  const { language } = useParams<PathParams>();

  return <Redirect to={buildLenke(lenker.KroniskKvittering, language)} />;
};

export default KvitteringLink;
