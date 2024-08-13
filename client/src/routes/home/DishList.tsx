import React from 'react';
import {Link} from 'react-router-dom';
import {styled} from 'styled-components';

const DishList = ({data, className}) => {
  return (
    <section className={className}>
      <h3>What do you want to cook today?</h3>
      <div className="list">
        {data?.dishes?.map(({id, name, logo}) => (
          <Link to={`../dish/${id}`} key={id}>
            <div className="dish">
              <img src={logo} alt="logo" className="dish-logo" />
              <p className="dish-name">{name}</p>
            </div>
          </Link>
        )) ?? <p>Empty list</p>}
      </div>
    </section>
  );
};

export const StyledDishList = styled(DishList)`
  margin-top: 10px;

  .list {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    row-gap: 9px;

    a {
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: white;
        text-decoration: none;
      }

      .dish {
        position: relative;

        .dish-logo {
          width: 100%;
        }

        .dish-name {
          position: absolute;
          top: 91%;
          left: 1%;
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          letter-spacing: -0.5px;
        }
      }
    }
  }
`;
