import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Upload from './Upload';

describe('Upload', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render nicely', () => {
    render(
      <Upload
        id='1'
        label='Upload'
        extensions='jpg'
        fileSize={123}
        onChange={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('should change the button label when a file is selected', () => {
    const mockChangeFn = jest.fn();
    render(
      <Upload
        id='1'
        label='Upload'
        extensions='jpg'
        fileSize={123}
        onChange={mockChangeFn}
        onDelete={jest.fn()}
      />
    );

    const uploadInput = screen.getByLabelText('Upload');
    fireEvent.change(uploadInput, {
      target: {
        files: [
          {
            size: 10,
            name: 'filename'
          }
        ]
      }
    });
    expect(screen.getByText('filename')).toBeInTheDocument();
    expect(mockChangeFn).toHaveBeenLastCalledWith({
      size: 10,
      name: 'filename'
    });
  });

  it('should show an error when the file is to big, text on button should stay the same', () => {
    const mockChangeFn = jest.fn();
    render(
      <Upload
        id='1'
        label='UploadFile'
        extensions='gif'
        fileSize={150 * 1024}
        onChange={mockChangeFn}
        onDelete={jest.fn()}
      />
    );

    const uploadInput = screen.getByLabelText('UploadFile');
    fireEvent.change(uploadInput, {
      target: {
        files: [
          {
            size: 200000,
            name: 'AnotherFilename'
          }
        ]
      }
    });
    expect(screen.getByText('UploadFile')).toBeInTheDocument();
    expect(
      screen.getByText('Filen er for stor. (Maks tillatt størrelse er 150 KB)')
    ).toBeInTheDocument();
    expect(mockChangeFn).toHaveBeenLastCalledWith({
      size: 200000,
      name: 'AnotherFilename'
    });
  });

  it('should have no a11y violations', async () => {
    const { container } = render(
      <Upload
        id='1'
        label='Upload'
        extensions='jpg'
        fileSize={123}
        onChange={jest.fn()}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
