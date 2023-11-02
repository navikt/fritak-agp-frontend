import React from 'react';
import { redirectUrl } from './redirectUrl';

interface LoginRedirectProps {
  loginServiceUrl: string;
}

const LoginRedirect = (props: LoginRedirectProps) => {
  window.location.href = redirectUrl(props.loginServiceUrl, window.location.href);
  return <div className='login-redirect'>login-redirect</div>;
};

export default LoginRedirect;
