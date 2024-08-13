import React from 'react';
import {styled} from 'styled-components';

const Dish = ({update, data, className}) => {
  return (
    <section id={data?.id} className={className}>
      <header>
        <h2>{data?.name}</h2>
      </header>
      <div>
        {data?.ingridients?.map(({id, name, quantity, unit}) =>
          name ? (
            <ul key={id}>
              <li>
                <p>
                  {name} {quantity} {unit}
                </p>
              </li>
            </ul>
          ) : (
            <div>No ingridients</div>
          )
        )}
      </div>
      <button type="button" onClick={() => update()}>
        Update
      </button>
    </section>
  );
};

export const StyledDish = styled(Dish)`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  padding: 3%;

  header {
    h2 {
      margin: 0;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.5px;
    }
  }

  div {
    ul {
      margin: 0;

      li {
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.08px;
      }
    }
  }

  button {
    align-self: start;
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
