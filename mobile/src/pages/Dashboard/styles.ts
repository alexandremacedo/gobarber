import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';

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

  padding: 30px 15px 16px;

`;

export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 8px;
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

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-weight: bold;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
`;
