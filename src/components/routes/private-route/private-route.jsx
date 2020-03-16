import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus} from "../../../reducer/user/user.js";
import {AppRoute} from "../../../const.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(propsFromRoute) => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          render(propsFromRoute)
        ) : (
          <Redirect to={`${AppRoute.LOGIN}`} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
