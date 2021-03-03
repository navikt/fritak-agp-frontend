import formatTiltakBeskrivelse from './formatTiltakBeskrivelse';
import { Tiltak } from '../../../gravid/Tiltak';

describe('formatTiltakBeskrivelse', () => {
  it('should format hjemmekontor', () => {
    expect(formatTiltakBeskrivelse('HJEMMEKONTOR', 'minbeskrivelse')).toEqual('hjemmekontor');
  });
});
