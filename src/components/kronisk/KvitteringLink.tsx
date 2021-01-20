import { Redirect } from 'react-router-dom';
import lenker from '../lenker';
import React from 'react';

const KvitteringLink = () => {
  return <Redirect to={lenker.KroniskKvittering} />;
};

export default KvitteringLink;
