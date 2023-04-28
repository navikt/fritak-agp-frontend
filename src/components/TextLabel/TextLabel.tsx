import React from 'react';

import styles from './TextLabel.module.css';

interface TextLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium';
  children?: React.ReactNode;
}

export default function TextLabel(props: TextLabelProps) {
  const size = props.size || 'medium';
  const theClassName = props.className || '';

  return (
    <div
      className={`navds-text-field__label navds-label navds-label--${size} ${styles.textlabel} ${theClassName}`}
      {...props}
    >
      {props.children}
    </div>
  );
}
