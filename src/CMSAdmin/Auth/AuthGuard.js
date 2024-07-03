import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // debugger; // Add debugger to inspect props
  console.log("i added this for conflict");
    console.log('M conflict my side');
  return (
    <Route
      {...rest}
      render={props => {
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
