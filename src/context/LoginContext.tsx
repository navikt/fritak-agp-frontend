import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import env from '../environment';
import { GetLoginExpiry } from '../api/loginexpiry/LoginExpiryAPI';
import { TilgangsfeilSide } from '../components/TilgangsfeilSide';

export const buildLoginContext = (loggedIn: boolean) => ({
  // loggedIn: loggedIn,
  // setLoggedIn: (isLoggedIn: boolean) => {}
});

const LoginContext = createContext(buildLoginContext(false));

interface LoginContextProviderProps {
  children: any;
  loggedIn?: boolean;
  baseUrl: string;
  loginExpiry?: number;
}

export const isLoggedInFromUrl = () => window.location.search.indexOf('loggedIn=true') > -1;

export const redirectUrl = (loginServiceUrl: string, href: string) => loginServiceUrl.replace('XXX', href);

export const redirectWithoutParams = (pathname: string) => pathname.replace('/fritak-agp', '');

export const LoginRedirect = () => <div className='login-provider-redirect' />;

export enum LoginStatus {
  Checking,
  Verified,
  MustLogin
}

export const LoginProvider = ({ baseUrl, children, loginExpiry = 0 }: LoginContextProviderProps) => {
  const history: History = useHistory();
  const [expiry, setExpiry] = useState<number>(loginExpiry);
  useEffect(() => {
    if (expiry === LoginStatus.Checking) {
      GetLoginExpiry(baseUrl).then((loginExpiryResponse) => {
        if (loginExpiryResponse.tidspunkt !== undefined) {
          setExpiry(LoginStatus.Verified);
        } else {
          setExpiry(LoginStatus.MustLogin);
        }
      });
    }
  });

  if (expiry === LoginStatus.Checking) {
    return <div className='login-provider-checking'>Loading...</div>;
  }

  if (expiry === LoginStatus.MustLogin) {
    if (!isLoggedInFromUrl()) {
      // Prevents infinite loop
      window.location.href = redirectUrl(env.loginServiceUrl, window.location.href);
      return <LoginRedirect />;
    }
    return <TilgangsfeilSide />;
  }

  // Fjerner ?loggedIn=true fra urlen i browsern
  // history.push(redirectWithoutParams(window.location.pathname));
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};
