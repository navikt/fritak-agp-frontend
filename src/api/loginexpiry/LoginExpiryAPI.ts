export interface LoginExpiryResponse {
  status: number;
  tidspunkt?: Date;
}

export const ParseExpiryDate = (value: string) => new Date(value.substring(0, 23));

const LoginExpiryAPI = (basePath: string): Promise<LoginExpiryResponse> => {
  return fetch(basePath + '/api/v1/login-expiry', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          status: response.status,
          tidspunkt: ParseExpiryDate(data)
        };
      });
    }
    return {
      status: response.status
    };
  });
};

export default LoginExpiryAPI;
