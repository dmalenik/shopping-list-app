import {redirect} from 'react-router-dom';

export const addDishAction = async ({request}: any) => {
  const formData = await request.formData();

  return postDishData(formData);
};

const postDishData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/profile/dishes/add', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return success && redirect('..');
  } catch (error) {
    return error;
  }
};
