import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change item`, () => {
  const wrapper = shallow(<MockComponentWrapped
    activeItem={`Some item`}
  />);

  wrapper.props().onActiveItemChange(`Another item`);
  expect(wrapper.props().activeItem).toBe(`Another item`);
});
