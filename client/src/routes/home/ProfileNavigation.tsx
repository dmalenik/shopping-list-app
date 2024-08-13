import React from 'react';
import {NavLink} from 'react-router-dom';
import {styled} from 'styled-components';

const ProfileNavigation = ({className, menu}) => {
  return (
    <nav className={className}>
      {menu.map((a: {key: string; title: string; path: string}) => (
        <NavLink to={`../${a.path}`} key={a.key} className={a.path}>
          {a.title}
        </NavLink>
      ))}
    </nav>
  );
};

export const StyledProfileNavigation = styled(ProfileNavigation)`
  display: flex;
  column-gap: 15px;
  padding: 3%;

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: unset;
    text-decoration: none;
  }

  .home {
    margin-right: auto;
  }
`;
