import React from 'react';

interface TextLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium';
  children?: React.ReactNode;
}

export default function TextLabel(props: TextLabelProps) {
  const size = props.size || 'medium';
  const theClassName = props.className || '';

  return (
    <div {...props} className={`navds-text-field__label navds-label navds-label--${size} ${theClassName}`}>
      {props.children}
    </div>
  );
}
