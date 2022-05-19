import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KravKvitteringSlettet from './KravKvitteringSlettet';
import { mockApp } from '../../mockData/mockApp';
import lenker from '../../config/lenker';

describe('KravKvitteringSlettet', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KravKvitteringSlettet backTarget={lenker.GravidKrav} />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KravKvitteringSlettet backTarget={lenker.GravidKrav} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
