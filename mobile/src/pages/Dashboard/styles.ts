import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export const Container = styled.View`
  flex: 1;

`;
export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'ios' ? `${getStatusBarHeight() + 24}px` : '24px'};
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #999591;
  font-size: 18px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-weight: bold;
`;

export const ProfileButton = styled.TouchableOpacity`

`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>
)`



`;
