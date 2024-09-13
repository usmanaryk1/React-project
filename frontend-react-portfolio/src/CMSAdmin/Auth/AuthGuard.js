import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <div>Loading...</div>; // Show loader while loading
        }
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/form/login-form" />
        );
      }}
    />
  );
};

export default PrivateRoute;
