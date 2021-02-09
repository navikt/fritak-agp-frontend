import React, { createContext, useContext, useState } from 'react';
import env from '../environment';
import LoginExpiryAPI from '../api/loginexpiry/LoginExpiryAPI';

export const buildLoginExpiryContext = (loginExpiry?: Date) => ({
  loginExpiry
});

const LoginExpiryContext = createContext(buildLoginExpiryContext());

interface LoginExpiryContextProviderProps {
  children: any;
  path?: string;
  status?: number;
  loginExpiry?: number;
}

export const useLoginExpiry = () => useContext(LoginExpiryContext);

export const LoginExpiryProgress = () => <div className='login-expiry'>Venter</div>;

const LoginExpiryProvider = (props: LoginExpiryContextProviderProps) => {
  const [status, setStatus] = useState<number>(props.status || 0);
  const [loginExpiry, setLoginExpiry] = useState<Date>();
  if (status === 0) {
    setStatus(1); // In progress
    LoginExpiryAPI(env.basePath).then((res) => {
      setLoginExpiry(res.tidspunkt);
      setStatus(2); // done
    });
  }
  if (status < 2) {
    return <LoginExpiryProgress />;
  }
  return (
    <LoginExpiryContext.Provider
      value={{
        loginExpiry
      }}
    >
      {props.children}
    </LoginExpiryContext.Provider>
  );
};

export default LoginExpiryProvider;
