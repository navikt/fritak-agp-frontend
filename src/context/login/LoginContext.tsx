import React, { createContext, useEffect, useState, useMemo, PropsWithChildren } from 'react';
import { GetLoginExpiry } from '../../api/loginexpiry/GetLoginExpiry';
import TilgangsfeilSide from '../../components/felles/login/TilgangsfeilSide';
import { LoginStatus } from './LoginStatus';
import LoginRedirect from './LoginRedirect';
import LoginChecking from './LoginChecking';

const LoginContext = createContext({});

interface LoginContextProviderProps {
  baseUrl: string;
  loginServiceUrl: string;
  status?: LoginStatus;
}

export const LoginProvider = ({
  baseUrl,
  children,
  loginServiceUrl,
  status = LoginStatus.Checking
}: PropsWithChildren<LoginContextProviderProps>) => {
  const [expiry, setExpiry] = useState<number>(status);
  useEffect(() => {
    if (expiry === LoginStatus.Checking) {
      GetLoginExpiry(baseUrl).then((loginExpiryResponse) => {
        if (!loginExpiryResponse.tidspunkt) {
          setExpiry(LoginStatus.MustLogin);
        }
        if (loginExpiryResponse.tidspunkt && loginExpiryResponse.tidspunkt.getTime() < new Date().getTime()) {
          setExpiry(LoginStatus.MustLogin);
        } else {
          setExpiry(LoginStatus.Verified);
        }
      });
    }
  });

  const emptyObject = useMemo(() => ({}), []);

  switch (expiry) {
    case LoginStatus.Checking:
      return <LoginChecking />;
    case LoginStatus.MustLogin:
      return <LoginRedirect loginServiceUrl={loginServiceUrl} />;
    case LoginStatus.Failed:
      return <TilgangsfeilSide />;
    default:
      return <LoginContext.Provider value={emptyObject}>{children}</LoginContext.Provider>;
  }
};
