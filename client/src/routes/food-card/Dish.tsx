import React from 'react';

export const Dish = ({update, data}) => {
  return (
    <section id={data?.id}>
      <header>
        <h2>{data?.name}</h2>
      </header>
      <div>
        {data?.ingridients?.map(({id, name, quantity, unit}) =>
          name ? (
            <ul key={id}>
              <li>{name}</li>
              <li>{quantity}</li>
              <li>{unit}</li>
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
