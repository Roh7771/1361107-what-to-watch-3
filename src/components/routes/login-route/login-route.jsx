import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus} from "../../../reducer/user/user.js";


const LoginRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? <Redirect to={`/`} />
            : render()
        );
      }}
    />
  );
};

LoginRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   authorizationStatus: getAuthorizationStatus(state),
// });


export default LoginRoute;
// export default connect(mapStateToProps)(LoginRoute);
