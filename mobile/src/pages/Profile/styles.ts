import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  position: relative;

  padding: 0 30px ${Platform.OS === 'android' ? 40 : 40}px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButton = styled(RectButton)`
  margin-top: 40px;
`;

export const LogOutButton = styled(RectButton)`
  margin-top: 40px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
  align-self: flex-start;
`;

export const UserAvatarButton = styled(RectButton)``;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: ${186 / 2}px;
  align-self: center;
`;
