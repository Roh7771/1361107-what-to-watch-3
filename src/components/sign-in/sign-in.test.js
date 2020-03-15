import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from "../../history";

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignIn
          onLoginFormSubmit={() => {}}
          isFormSending={false}

        >
          <footer>Some footer</footer>
        </SignIn>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
