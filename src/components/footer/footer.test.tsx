import * as React from "react";
import * as renderer from "react-test-renderer";
import Footer from "./footer";
import {Router} from "react-router-dom";
import history from "../../history";

it(`<Footer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Footer
            withLink
          />
        </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
