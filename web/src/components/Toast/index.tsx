import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import ToastContainer from './ToastContainer';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransictions = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
        transform: 'rotateY(180deg)',
      },
      enter: {
        right: '0%',
        opacity: 1,
        transform: 'rotateY(0deg)',
      },
      leave: {
        right: '-120%',
        opacity: 0,
        transform: 'rotateY(180deg)',
      },
    },
  );

  return (
    <Container>
      {messagesWithTransictions.map(({ item, key, props }) => (
        <ToastContainer key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default Toast;
