export const loginAction = async ({request}: any) => {
  const formData = await request.formData();

  return postLoginData(formData);
};

const postLoginData = async (formData: FormData) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    const {success}: any = await response.json();

    return success;
  } catch (error) {
    return error;
  }
};
