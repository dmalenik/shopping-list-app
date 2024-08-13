import {redirect} from 'react-router-dom';

export const addDishAction = async ({request}: {request: Request}) => {
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
    const finalResponse = (await response.json()) as {success: boolean};

    return finalResponse.success ? redirect('../home') : finalResponse.success;
  } catch (error) {
    return error;
  }
};
