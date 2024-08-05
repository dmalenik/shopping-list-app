import React from 'react';

export const User = ({data, stats, update}) => {
  return (
    <section>
      {data?.logo && <img src={data.logo} alt="photo" />}
      <h3>{data?.username ?? ''}</h3>
      <div>
        <div>
          <b>{stats?.dishes ?? '---'}</b> Recipes
        </div>
        <div>
          <b>{stats?.items ?? '---'}</b> Items
        </div>
      </div>
      <div>
        <button type="button" onClick={() => update()}>
          Change
        </button>
      </div>
    </section>
  );
};
