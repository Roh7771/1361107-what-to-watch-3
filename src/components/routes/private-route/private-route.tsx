import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AuthorizationStatus} from "../../../reducer/user/user";
import {AppRoute} from "../../../const";

type Props = RouteProps & {
  path: string;
  authorizationStatus: string;
  exact: boolean;
}

const PrivateRoute: React.FunctionComponent<Props> = (props) => {
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

export default PrivateRoute;
