import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  > header {
    display: flex;

    background-color: #28262e;
    height: 144px;

    > div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      align-items: center;

      > a {
        align-items: center;
        transition: color 0.2;

        svg {
          height: 24px;
          width: 24px;
          color: #999591;
        }

        svg:hover {
          color: ${shade(0.2, '#999591')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
  margin: -176px auto 0px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      color: #f4ede8;
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarProfile = styled.div`
  position: relative;
  align-self: center;
  margin-bottom: 32px;

  > img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  > label {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
    background-color: #ff9000;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    bottom: 0;

    transition: color 0.2s;

    svg {
      color: #312e38;
      height: 20px;
      width: 20px;
    }

    svg:hover {
      color: ${shade(0.2, '#312e38')};
    }

    > input {
      display: none;
    }
  }
`;
