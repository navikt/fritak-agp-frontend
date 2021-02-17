import React, { createContext, useEffect, useState } from 'react';
import GetLoginExpiry from '../../api/loginexpiry/LoginExpiryAPI';
import { TilgangsfeilSide } from '../../components/login/TilgangsfeilSide';
import { LoginStatus } from './LoginStatus';
import { LoginRedirect } from './LoginRedirect';
import { LoginChecking } from './LoginChecking';
import isLoggedInFromUrl from './isLoggedInFromUrl';
import dayjs from 'dayjs';
import { LoginExpiryResponse } from '../../api/loginexpiry/LoginExpiryResponse';

const LoginContext = createContext({});

interface LoginContextProviderProps {
  children: any;
  baseUrl: string;
  loginServiceUrl: string;
  status?: LoginStatus;
}

export const LoginProvider = ({ baseUrl, children, status = LoginStatus.Checking }: LoginContextProviderProps) => {
  const [expiry, setExpiry] = useState<number>(status);
  useEffect(() => {
    if (expiry === LoginStatus.Checking) {
      GetLoginExpiry(baseUrl).then((loginExpiryResponse) => {
        if (loginExpiryResponse.tidspunkt === undefined || isExpiredTokenTimestamp(loginExpiryResponse)) {
          if (isExpiredTokenTimestamp(loginExpiryResponse)) {
            setExpiry(LoginStatus.MustLogin);
          } else if (isLoggedInFromUrl()) {
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

  switch (expiry) {
    case LoginStatus.Checking:
      return <LoginChecking />;
    case LoginStatus.MustLogin:
      return <LoginRedirect />;
    case LoginStatus.Failed:
      return <TilgangsfeilSide />;
  }
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>;
};

function isExpiredTokenTimestamp(loginExpiryResponse: LoginExpiryResponse): boolean | undefined {
  return loginExpiryResponse.tidspunkt && dayjs(loginExpiryResponse.tidspunkt).isBefore(dayjs());
}
