export const shoppingListLoader = async ({params}: any) =>
  await fetch(`/api/profile/lists/${params.id}`);
