import handleStatus from './handleStatus';
import RestStatus from './RestStatus';

describe('handleStatus', () => {
  it('Should return a valid json object', () => {
    const params = ({
      status: 200,
      json: () => {
        return {
          iam: 'happy'
        };
      }
    } as unknown) as Response;

    expect(handleStatus(params)).toEqual({ iam: 'happy' });
  });

  it('Should reject a promisse with code 401 for response with status 401', () => {
    const params = ({
      status: 401,
      json: () => {
        return {
          iam: 'happy'
        };
      }
    } as unknown) as Response;

    expect(handleStatus(params)).rejects.toBe(RestStatus.Unauthorized);
  });

  it('Should reject a promisse with code 500 for response with status 500', () => {
    const params = ({
      status: 500,
      json: () => {
        return {
          iam: 'happy'
        };
      }
    } as unknown) as Response;

    expect(handleStatus(params)).toEqual({ iam: 'happy' });
  });

  it('Should reject a promisse with code -2 (Unknown) for response with unknown (667) status', () => {
    const params = ({
      status: 667,
      json: () => {
        return {
          iam: 'happy'
        };
      }
    } as unknown) as Response;

    expect(handleStatus(params)).rejects.toBe(RestStatus.Unknown);
  });
});
