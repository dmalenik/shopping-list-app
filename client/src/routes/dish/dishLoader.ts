export const dishLoader = async ({params}: any) =>
  await fetch(`/api/profile/dishes/${params.id}`);
