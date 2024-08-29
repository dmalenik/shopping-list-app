import {Params} from 'react-router-dom';

export const foodCardLoader = async ({params}: {params: Params}) =>
  await fetch(`/api/dish/${params.id}`);
