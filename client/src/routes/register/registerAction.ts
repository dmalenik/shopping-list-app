import {redirect} from 'react-router-dom';

export const registerAction = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  return postRegisterData(formData);
};

const postRegisterData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success} = (await response.json()) as {success: boolean};

    return success ? redirect('/login') : null;
  } catch (error) {
    return error;
  }
};
