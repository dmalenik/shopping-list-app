import React from 'react';
import {navigationData} from '../../shared/data';
import {mainPageData} from './sectionData';
import {StyledNavigation} from '../../shared/components';
import {StyledSection} from './Section';

export const MainPage = () => {
  return (
    <div>
      <StyledNavigation menu={navigationData} active="/" className="nav" />
      <main>
        {mainPageData.map(s => (
          <StyledSection data={s} key={s.id} className="card" />
        ))}
      </main>
    </div>
  );
};
