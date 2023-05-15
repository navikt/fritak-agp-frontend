import React from 'react';
import Oversettelse from '../Oversettelse/Oversettelse';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { PageNotFoundKeys } from './PageNotFoundKeys';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <Side sidetittel={t(PageNotFoundKeys.PAGE_NOT_FOUND_TITLE)} title={''} subtitle='' bedriftsmeny={false}>
      <Oversettelse langKey={PageNotFoundKeys.PAGE_NOT_FOUND_DESCRIPTION} />
    </Side>
  );
};

export default PageNotFound;
