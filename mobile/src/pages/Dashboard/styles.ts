import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

import { FlatList } from 'react-native';
import { Provider } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: #28262e;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
  font-size: 20px;
`;

export const ProfileButton = styled(RectButton)``;

export const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: ${56 / 2}px;
`;

export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 24px;
  font-size: 24px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderItem = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #999591;
  margin-left: 8px;
`;
