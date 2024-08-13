import React, {useState, useEffect} from 'react';
import {Form, useActionData, Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';

  const logout = useLoaderData() as {logout: boolean};
  const [keys, setKeys] = useState([crypto.randomUUID()]);
  const actionData = useActionData() as boolean;
  const status = useLoaderData();
  const [storedValue, setValue] = useLoginState();

  // // logout when session timeout
  useEffect(() => status?.logout && setValue(false), [status]);

  return (
    <div>
      <nav>
        <Link to={'../home'}>Back</Link>
      </nav>
      <main>
        <Form method="post" encType="multipart/form-data">
          <div>
            <label htmlFor="logo">Add Cover Photo</label>
            <input type="file" id="logo" name="logo" accept="image/*" />
          </div>
          <div>
            <label htmlFor="name">Food Name</label>
            <input name="name" id="name" placeholder="Dish" />
          </div>
          <div>
            <h4>Ingridients</h4>
            {keys.map(k => (
              <fieldset key={k}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input name="name" id="name" placeholder="name" />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <input name="quantity" id="quantity" placeholder="quantity" />
                </div>
                <div>
                  <label htmlFor="unit">Unit</label>
                  <input name="unit" id="unit" placeholder="unit" />
                </div>
                <input name="id" defaultValue={k} type="hidden" />
              </fieldset>
            ))}
            <button
              type="button"
              onClick={() => setKeys(k => [...k, crypto.randomUUID()])}
            >
              + Ingridient
            </button>
          </div>
          <button type="submit">Add dish to list</button>
        </Form>
        {actionData?.success && <div>This dish already exists in the list</div>}
      </main>
    </div>
  );
};
