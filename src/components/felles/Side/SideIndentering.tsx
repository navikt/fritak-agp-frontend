import React, { PropsWithChildren } from 'react';

import './SideIndentering.sass';

interface SideIndenteringProps {}

const SideIndentering = (props: PropsWithChildren<SideIndenteringProps>) => (
  <div className='sideindentering'>{props.children}</div>
);

export default SideIndentering;
