import React, {useState, useEffect} from 'react';
import {Form, useActionData, Link, useLoaderData} from 'react-router-dom';
import {useLoginState} from '../../hooks';
import {FaRegImage} from 'react-icons/fa';
import {styled} from 'styled-components';

export const AddDish = ({className}) => {
  const logout = useLoaderData() as {logout: boolean};
  const [keys, setKeys] = useState([crypto.randomUUID()]);
  const actionData = useActionData() as boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedValue, setValue] = useLoginState();

  // // logout when session timeout
  useEffect(() => {
    if (logout?.logout) {
      setValue(false);
    }
  }, [logout]);

  return (
    <div className={className}>
      <nav>
        <Link to={'../home'}>Back</Link>
      </nav>
      <main>
        <Form method="post" encType="multipart/form-data">
          <div className="photo">
            <FaRegImage />
            <label htmlFor="logo">Add Cover Photo</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              autoComplete="on"
            />
          </div>
          <div className="name">
            <label htmlFor="food">Food Name</label>
            <input name="name" id="food" placeholder="Dish" autoComplete="on" />
          </div>
          <div className="ingridients">
            <h4>Ingridients</h4>
            {keys.map(k => (
              <fieldset key={k} className="ingridient">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    id="name"
                    placeholder="Name"
                    autoComplete="on"
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    autoComplete="on"
                  />
                </div>
                <div>
                  <label htmlFor="unit">Unit</label>
                  <input
                    name="unit"
                    id="unit"
                    placeholder="Unit"
                    autoComplete="on"
                  />
                </div>
                <input
                  name="id"
                  defaultValue={k}
                  type="hidden"
                  autoComplete="off"
                />
              </fieldset>
            ))}
            <button
              type="button"
              onClick={() => setKeys(k => [...k, crypto.randomUUID()])}
            >
              +Ingridient
            </button>
          </div>
          <button type="submit">Add dish to list</button>
        </Form>
        {actionData === false && (
          <div className="validation">This dish already exists in the list</div>
        )}
      </main>
    </div>
  );
};

export const StyledAddDish = styled(AddDish)`
  display: flex;
  flex-direction: column;
  align-items: center;

  nav,
  main {
    padding: 3%;
  }

  nav {
    align-self: start;

    a:link,
    a:visited,
    a:hover,
    a:active {
      color: unset;
      text-decoration: none;
    }
  }

  main {
    form {
      display: flex;
      flex-direction: column;
      row-gap: 35px;
      align-items: center;

      .photo,
      .name {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
        width: 100%;

        label {
          font-weight: bold;
        }
      }

      .photo {
        border: 2px dashed #ebebeb;
        border-radius: 10px;
        row-gap: 20px;
        font-size: 15px;
        padding: 16px 14px;
      }

      .name {
        label {
          align-self: start;
        }

        input {
          height: 54px;
          border-radius: 10px;
          border: 2px solid #ebebeb;
          font-weight: 400;
          font-size: 15px;
          line-height: 20px;
          width: 100%;
          padding: 16px 14px;
        }
      }

      .ingridients {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 25px;

        h4 {
          margin: 0;
          align-self: start;
        }

        .ingridient {
          display: flex;
          column-gap: 15px;
          border: none;
          width: 100%;
          padding: 0;

          div {
            display: flex;
            flex-direction: column;
            row-gap: 7px;

            input {
              height: 54px;
              border-radius: 10px;
              border: 2px solid #ebebeb;
              font-weight: 400;
              font-size: 15px;
              line-height: 20px;
              padding: 16px 14px;
            }
          }
        }

        button {
          margin-top: 10px;
          width: 120px;
          height: 52px;
          border-radius: 12px;
          padding: 17px;
          background-color: #151924;
          color: #ffffff;
          font-weight: 700;
          font-size: 17px;
        }
      }

      button {
        margin-top: 15px;
        height: 54px;
        border-radius: 12px;
        background-color: #151924;
        color: #ffffff;
        font-weight: 700;
        font-size: 17px;
        width: 25%;
      }
    }

    .validation {
      margin-top: 20px;
    }
  }
`;
