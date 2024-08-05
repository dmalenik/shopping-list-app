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
    const finalResponse: any = await response.json();

    return finalResponse?.delete ? redirect('../../home') : finalResponse;
  } catch (error) {
    return error;
  }
};
