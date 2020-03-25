import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from '../../utils';

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignIn
          onLoginFormSubmit={noop}
          isFormSending={false}
          formErrorMessage={null}

        >
          <footer>Some footer</footer>
        </SignIn>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
