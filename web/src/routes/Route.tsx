import React from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface ReactDOMRouteProps extends ReactDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<ReactDOMRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
        );
      }}
    />
  );
};

export default Route;
