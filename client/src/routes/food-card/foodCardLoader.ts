export const foodCardLoader = async ({params}: any) =>
  await fetch(`/api/home/dish/${params.id}`);
