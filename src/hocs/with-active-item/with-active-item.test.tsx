import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeItem={`Some item`}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
