import {redirect} from 'react-router-dom';

export const addDishAction = async ({request}: any) => {
  const formData = await request.formData();

  return postDishData(formData);
};

const postDishData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/home/dish/add', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return (success && redirect('../home')) || null;
  } catch (error) {
    return error;
  }
};
