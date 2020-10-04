import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;


export const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
  color: #f4ede8;
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999591;
  text-align: center;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 24px;
  padding: 12px 44px;
`;

export const OkButtonText = styled.Text`
  font-weight: bold;
  color: #312e38;
  font-size: 16px;
`;

