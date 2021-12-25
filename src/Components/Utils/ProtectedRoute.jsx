import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserConnected } from "../../Services/userService";

const ProtectedRoute = ({
  path,
  component: Component,
  permission,
  ...rest
}) => {
  const currentUser = isUserConnected();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser.level !== permission)
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        return Component;
      }}
    />
  );
};

export default ProtectedRoute;
