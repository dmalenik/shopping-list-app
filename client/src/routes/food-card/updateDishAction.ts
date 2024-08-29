import {redirect} from 'react-router-dom';

export const updateDishAction = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  return postDishUpdateData(formData);
};

const postDishUpdateData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/dish/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const finalResponse = (await response.json()) as {delete: boolean};

    return finalResponse.delete ? redirect('../../home') : finalResponse;
  } catch (error) {
    return error;
  }
};
