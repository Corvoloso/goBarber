import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused?: boolean;
  isErrored?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-radius: 10px;
  background: #232128;
  border-width: 2px;
  border-color: #232129

  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #f99000;
    `}

  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 16px;
`;
