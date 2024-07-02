import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  debugger; // Add debugger to inspect props
  return (
    <Route
      {...rest}
      render={props => {
        debugger; // Add debugger to inspect rendering logic
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default PrivateRoute;
