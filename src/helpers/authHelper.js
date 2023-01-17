import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from '../constants/defaultValues';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  isLogin,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      if (isLogin) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }
    } else {
      return <Component {...props} />;
    }
  };
  return <Route {...rest} render={setComponent} />;
};

const UserRole = {
  Admin: 0,
  Editor: 1,
};

export { ProtectedRoute, UserRole };
