import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useEnvironment } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const buildLoginContext = (loggedIn: boolean) => ({
  loggedIn: loggedIn,
  setLoggedIn: (isLoggedIn: boolean) => {}
});

const LoginContext = createContext(buildLoginContext(false));

interface LoginContextProviderProps {
  children: any;
  loggedIn?: boolean;
}

export const isLoggedInFromUrl = () => window.location.search.indexOf('loggedIn=true') > -1;

export const redirectUrl = (loginServiceUrl: string, href: string) => loginServiceUrl.replace('XXX', href);

export const redirectWithoutParams = (pathname: string) => pathname.replace('/fritak-agp', '');

export const LoginRedirect = () => <div className='login-context-redirect' />;

export const LoginProvider = (props: LoginContextProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(props.loggedIn === true || isLoggedInFromUrl());
  const history: History = useHistory();
  const { loginServiceUrl } = useEnvironment();
  if (!loggedIn) {
    window.location.href = redirectUrl(loginServiceUrl, window.location.href);
    return <LoginRedirect />;
  }
  // Fjerner ?loggedIn=true fra urlen i browsern
  history.push(redirectWithoutParams(window.location.pathname));
  return <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>{props.children}</LoginContext.Provider>;
};
