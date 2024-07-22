export const dishesLoader = async () => {
  return await fetch('/api/profile/dishes');
};
