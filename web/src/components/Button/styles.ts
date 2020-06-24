import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  color: #fff;
  border-radius: 8px;
  border: 0px;
  padding: 16px;
  width: 100%;

  margin-top: 16px;

  transition: 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
