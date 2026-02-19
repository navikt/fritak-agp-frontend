import React, { useEffect } from 'react';
import { redirectUrl } from './redirectUrl';

interface LoginRedirectProps {
  loginServiceUrl: string;
}

const LoginRedirect = (props: LoginRedirectProps) => {
  useEffect(() => {
    window.location.href = redirectUrl(props.loginServiceUrl, window.location.href);
  }, [props.loginServiceUrl]);
  return <div className='login-redirect'>login-redirect</div>;
};

export default LoginRedirect;
