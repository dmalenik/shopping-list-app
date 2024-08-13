import React from 'react';
import {styled} from 'styled-components';

const User = ({data, stats, update, className}) => {
  return (
    <section className={className}>
      {data?.logo && <img src={data.logo} alt="photo" />}
      <h3>{data?.username ?? ''}</h3>
      <div className="stats">
        <div>
          <b>{stats.dishes || '---'}</b> Recipes
        </div>
        <div>
          <b>{stats.items || '---'}</b> Items
        </div>
      </div>
      <button type="button" onClick={() => update()}>
        Change
      </button>
    </section>
  );
};

export const StyledUser = styled(User)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  h3 {
    margin: 0;
  }

  .stats {
    display: flex;
    column-gap: 50px;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
    }
  }

  button {
    align-self: center;
    width: 100px;
    height: 32px;
    border-radius: 12px;
    background-color: #151924;
    color: #ffffff;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
  }
`;
