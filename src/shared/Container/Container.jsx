import { useClasses } from '@geist-ui/core';
import React from 'react';
import s from './Container.module.scss';

const Container = ({ children, forMainContent = true }) => {
  const className = useClasses(s.container, forMainContent ? s.mainContainer : null);

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Container