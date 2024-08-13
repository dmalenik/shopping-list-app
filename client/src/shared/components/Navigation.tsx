import React from 'react';
import {NavLink} from 'react-router-dom';
import {styled} from 'styled-components';

const Navigation = ({menu, active, className}) => {
  return (
    <nav className={className}>
      {menu.map(({key, path, title}) => (
        <NavLink
          key={key}
          to={active === path ? '.' : `../${path}`}
          className={({isActive, isPending, isTransitioning}) =>
            [
              isActive ? 'active' : '',
              isPending ? 'pending' : '',
              isTransitioning ? 'transitioning' : '',
              path === '/' ? 'main' : '',
              path === 'register' ? 'register' : '',
              path === 'login' ? 'login' : '',
            ].join(' ')
          }
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export const StyledNavigation = styled(Navigation)`
  display: flex;
  column-gap: 15px;
  padding: 3%;

  a {
    font-size: 17px;

    &:link,
    &:visited,
    &:hover,
    &:active {
      color: unset;
      text-decoration: none;
    }

    &.main {
      margin-right: auto;
    }
  }
`;
