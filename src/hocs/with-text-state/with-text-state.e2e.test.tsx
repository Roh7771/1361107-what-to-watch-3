import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withTextState from "./with-text-state";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withTextState(MockComponent);

it(`Should change item`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  wrapper.props().onTextChange(`New text`);
  expect(wrapper.props().text).toBe(`New text`);
});
