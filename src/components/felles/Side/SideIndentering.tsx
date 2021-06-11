import React from 'react';
import './SideIndentering.sass';

interface SideIndenteringProps {
  children: any;
}

const SideIndentering = (props: SideIndenteringProps) => <div className='sideindentering'>{props.children}</div>;

export default SideIndentering;
