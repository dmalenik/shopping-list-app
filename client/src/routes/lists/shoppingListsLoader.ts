export const shoppingListsLoader = async () => {
  return await fetch('/api/profile/lists');
};
