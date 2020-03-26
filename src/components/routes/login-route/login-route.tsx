import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AuthorizationStatus} from "../../../reducer/user/user";
import {AppRoute} from "../../../const";

type Props = RouteProps & {
  path: string;
  authorizationStatus: string;
  exact: boolean;
}

const LoginRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          <Redirect to={`${AppRoute.ROOT}`} />
        ) : (
          render()
        );
      }}
    />
  );
};

export default LoginRoute;
