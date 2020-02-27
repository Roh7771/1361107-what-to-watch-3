import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item.js";

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
