import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 0 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  margin: 24px 0;

`;

export const UserAvatarButton = styled.TouchableOpacity`

`;

export const UserAvatar = styled.Image`
 width: 150px;
 height: 150px;
 border-radius: 75px;
 align-self: center;
`;

export const BackButton = styled.TouchableOpacity`

`;
