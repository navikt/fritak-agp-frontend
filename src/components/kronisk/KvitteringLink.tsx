import { History } from 'history';
import { useHistory } from 'react-router-dom';
import lenker from '../lenker';
import React from 'react';

const KvitteringLink = () => {
  const history: History = useHistory();
  history.push(lenker.KroniskKvittering);
  return <div className='kronisk-kvittering-link' />;
};

export default KvitteringLink;
