import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import SlettKravModal from './SlettKravModal';
import userEvent from '@testing-library/user-event';

describe('SlettKravModal', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={jest.fn()} showSpinner={false} modalOpen={true} onClose={jest.fn()} />
      </div>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it('should run the onClose function when "Nei" has been pressed', () => {
    const onCloseMock = jest.fn();
    render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={jest.fn()} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
      </div>
    );

    const neiButton = screen.getByText('Nei', { selector: 'button' });
    userEvent.click(neiButton);

    expect(onCloseMock).toBeCalled();
  });

  it('should run the onOKClicked function when "Ja" has been pressed', () => {
    const onCloseMock = jest.fn();
    const onOKClickedMock = jest.fn();

    render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={onOKClickedMock} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
      </div>
    );

    const jaButton = screen.getByText('Ja', { selector: 'button' });

    userEvent.click(jaButton);

    expect(onOKClickedMock).toBeCalled();
  });
});
