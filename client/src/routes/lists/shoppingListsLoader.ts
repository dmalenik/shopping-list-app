export const shoppingListsLoader = async () =>
  await fetch('/api/profile/lists');
