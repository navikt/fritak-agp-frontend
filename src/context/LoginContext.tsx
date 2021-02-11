import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import env from '../environment';
import { GetLoginExpiry } from '../api/loginexpiry/LoginExpiryAPI';
import { TilgangsfeilSide } from '../components/login/TilgangsfeilSide';

export const buildLoginContext = (loggedIn: boolean) => ({
  // loggedIn: loggedIn,
  // setLoggedIn: (isLoggedIn: boolean) => {}
});

const LoginContext = createContext(buildLoginContext(false));

export const isLoggedInFromUrl = () => window.location.search.indexOf('loggedIn=true') > -1;

export const redirectUrl = (loginServiceUrl: string, href: string) => loginServiceUrl.replace('XXX', href);

export const redirectWithoutParams = (pathname: string) => pathname.replace('/fritak-agp', '');

export const LoginRedirect = () => <div className='login-provider-redirect' />;

export enum LoginStatus {
  Checking,
  Verified,
  MustLogin,
  Failed
}

interface LoginContextProviderProps {
  children: any;
  baseUrl: string;
  loginServiceUrl: string;
  status?: LoginStatus;
}

export const LoginProvider = ({
  loginServiceUrl,
  baseUrl,
  children,
  status = LoginStatus.Checking
}: LoginContextProviderProps) => {
  const history: History = useHistory();
  const [expiry, setExpiry] = useState<number>(status);
  useEffect(() => {
    if (expiry === LoginStatus.Checking) {
      GetLoginExpiry(baseUrl).then((loginExpiryResponse) => {
        if (loginExpiryResponse.tidspunkt === undefined) {
          if (isLoggedInFromUrl()) {
            setExpiry(LoginStatus.Failed);
          } else {
            setExpiry(LoginStatus.MustLogin);
          }
        } else {
          setExpiry(LoginStatus.Verified);
        }
      });
    }
  });

  if (expiry === LoginStatus.Checking) {
    return <div className='login-provider-checking'>Loading...</div>;
  }

  if (expiry === LoginStatus.MustLogin) {
    window.location.href = redirectUrl(env.loginServiceUrl, window.location.href);
    return <LoginRedirect />;
  }

  if (expiry == LoginStatus.Failed) {
    return <TilgangsfeilSide />;
  }

  // Fjerner ?loggedIn=true fra urlen i browsern
  // history.push(redirectWithoutParams(window.location.pathname));
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};
