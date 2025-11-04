import React, { ReactNode } from 'react';

import './SideIndentering.sass';

interface SideIndenteringProps {
  children?: ReactNode;
}

const SideIndentering = (props: SideIndenteringProps) => <div className='sideindentering'>{props.children}</div>;

export default SideIndentering;
