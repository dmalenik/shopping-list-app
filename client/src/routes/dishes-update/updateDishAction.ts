import {redirect} from 'react-router-dom';

export const updateDishAction = async ({request}: any) => {
  const formData = await request.formData();

  return postDishUpdateData(formData);
};

const postDishUpdateData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/profile/dishes/update', {
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
