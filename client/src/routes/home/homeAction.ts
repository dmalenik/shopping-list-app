import {redirect} from 'react-router-dom';

export const homeAction = async ({request}: {request: Request}) => {
  const formData = await request.formData();

  return postUpdateUserData(formData);
};

const postUpdateUserData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const finalResponse = (await response.json()) as {logout: boolean};
    const action = formData.get('action');

    return finalResponse.logout && action === 'delete'
      ? redirect('../register')
      : finalResponse;
  } catch (error) {
    return error;
  }
};
