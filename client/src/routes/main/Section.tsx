import React from 'react';
import {styled} from 'styled-components';

export const Section = ({data, className}) => {
  return (
    <div id={data.id} className={className}>
      <header>
        <img src={data.logo.src} alt={data.logo.alt} />
        <h2>{data.heading}</h2>
      </header>
      <p>{data.description}</p>
    </div>
  );
};

export const StyledSection = styled(Section)`
  padding: 3%;
  text-align: justify;

  header {
    img {
      width: 100%;
      border-radius: 22px;
    }

    h2 {
      font-weight: 700;
      line-height: 34px;
      font-size: 28px;
      letter-spacing: 0.36px;
    }
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.24px;
  }
`;
