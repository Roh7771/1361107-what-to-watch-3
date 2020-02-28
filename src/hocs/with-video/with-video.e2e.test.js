import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";

configure({adapter: new Adapter()});

const Player = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that video turn on (play) when isPlaying prop becomes true`, () => {
  const PlayerWrapped = withVideo(Player);
  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    posterSrc=""
    videoSrc=""
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.setProps({isPlaying: true});

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that video turn off (load) when isPlaying prop becomes true`, () => {
  const PlayerWrapped = withVideo(Player);
  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    posterSrc=""
    videoSrc=""
  />);

  window.HTMLMediaElement.prototype.load = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `load`);

  wrapper.instance().componentDidMount();

  wrapper.setProps({isPlaying: false});

  expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
});
