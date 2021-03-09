import HttpStatus from '../HttpStatus';

const TimeoutPromise = (timeout: number = 10000) =>
  new Promise((resolve, reject) => setTimeout(() => reject('Tidsavbrudd'), timeout)).then(() => {
    return {
      status: HttpStatus.Timeout,
      json: {}
    };
  });

export default TimeoutPromise;
