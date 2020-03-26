import * as React from "react";
import * as renderer from "react-test-renderer";
import withTextState from "./with-text-state";

const MockComponent = () => <div />;
const MockComponentWrapped = withTextState(MockComponent);

it(`withTextState is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped/>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
