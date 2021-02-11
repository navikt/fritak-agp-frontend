import React from 'react';
import { redirectUrl } from './redirectUrl';
import env from '../../environment';

export const LoginRedirect = () => {
  window.location.href = redirectUrl(env.loginServiceUrl, window.location.href);
  return <div className='login-redirect' />;
};
