import React, { createContext, useState } from 'react';
import { useEnvironment, LoginExpiryAPI } from '@navikt/helse-arbeidsgiver-felles-frontend';
import RestStatus from '../api/RestStatus';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

export const buildLoginContext = (loggedIn: boolean, loginExpiry?: Date) => ({
  loggedIn: loggedIn,
  setLoggedIn: (isLoggedIn: boolean) => {},
  loginExpiry: loginExpiry
});

const LoginContext = createContext(buildLoginContext(false));

interface LoginContextProviderProps {
  children: any;
  loggedIn?: boolean;
  loginExpiry?: Date;
}

export const isLoggedInFromUrl = () => window.location.search.indexOf('loggedIn=true') > -1;

export const redirectUrl = (loginServiceUrl: string, href: string) => loginServiceUrl.replace('XXX', href);

export const pathWithoutRedirectParams = (pathname: string) => pathname.replace('/fritak-agp', '');

export const LoginRedirect = () => <div className='login-context-redirect' />;

export const LoginProvider = (props: LoginContextProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(props.loggedIn === true || isLoggedInFromUrl());
  const [loginExpiry, setLoginExpiry] = useState<Date>();
  const history = useHistory();
  const { loginServiceUrl, basePath } = useEnvironment();

  LoginExpiryAPI(basePath).then((accessTokenValidity) => {
    if (accessTokenValidity.status === RestStatus.Successfully || isLoggedInFromUrl()) {
      const timeStamp = dayjs(accessTokenValidity.tidspunkt).toDate();
      if (loginExpiry?.getTime() !== timeStamp.getTime()) {
        setLoginExpiry(timeStamp);
      }
      setLoggedIn(true);
    } else {
      // eslint-disable-next-line
      console.log('Redirect til det derre endepunktet');
      window.location.href = redirectUrl(loginServiceUrl, window.location.href);
      return <LoginRedirect />;
    }
  });

  history.replace(pathWithoutRedirectParams(window.location.pathname));
  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loginExpiry
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
