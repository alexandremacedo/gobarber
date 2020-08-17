import React from 'react';
import {
  RouteProps as ReactDOMRoutProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
// import { Container } from './styles';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRoutProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? 'signin' : '/',
                state: {
                  from: location,
                },
              }}
            />
          );
      }}
    />
  );
};

export default Route;
