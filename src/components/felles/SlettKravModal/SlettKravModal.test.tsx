import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import SlettKravModal from './SlettKravModal';

describe('SlettKravModal', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={vi.fn()} showSpinner={false} modalOpen={true} onClose={vi.fn()} />
      </div>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it('should run the onClose function when "Nei" has been pressed', () => {
    const onCloseMock = vi.fn();
    render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={vi.fn()} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
      </div>
    );

    const neiButton = screen.getByText(/Nei/);
    fireEvent.click(neiButton);

    expect(onCloseMock).toBeCalled();
  });

  it('should run the onOKClicked function when "Ja" has been pressed', () => {
    const onCloseMock = vi.fn();
    const onOKClickedMock = vi.fn();

    render(
      <div className='kravside'>
        <SlettKravModal onOKClicked={onOKClickedMock} showSpinner={false} modalOpen={true} onClose={onCloseMock} />
      </div>
    );

    const button = screen.getByText(/Ja/);

    fireEvent.click(button);

    expect(onOKClickedMock).toHaveBeenCalled();
  });
});
