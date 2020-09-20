import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Platform } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
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

export const BackButton = styled.TouchableOpacity`

`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-weight: bold;
  font-size: 18px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>
)`
  padding: 30px 24px;

`;

export const ProviderContainer = styled(RectButton) <ProviderContainerProps>`
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  margin-right:16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-weight: bold;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
`;
