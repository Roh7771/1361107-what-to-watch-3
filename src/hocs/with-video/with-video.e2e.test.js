import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";

configure({adapter: new Adapter()});

const TrailerPlayer = (props) => {
  const {children} = props;
  return <div>{children}</div>;
};

TrailerPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

describe(`For trailer video player`, () => {
  it(`Checks that video turn on (play) when isPlaying prop becomes true`, () => {
    const PlayerWrapped = withVideo(TrailerPlayer);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={false}
          posterSrc=""
          videoSrc=""
          type={`trailer`}
        />
    );

    window.HTMLMediaElement.prototype.play = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.setProps({isPlaying: true});

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that video turn off (load) when isPlaying prop becomes true`, () => {
    const PlayerWrapped = withVideo(TrailerPlayer);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={true}
          posterSrc=""
          videoSrc=""
          type={`trailer`}
        />
    );

    window.HTMLMediaElement.prototype.load = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `load`);

    wrapper.instance().componentDidMount();

    wrapper.setProps({isPlaying: false});

    expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
  });
});

const MoviePlayer = (props) => {
  const {
    children,
    onFullScreenButtonClick,
    onPlayButtonClick,
  } = props;
  return (
    <div>
      <div>{children}</div>
      <button className={`play-button`} onClick={onPlayButtonClick}></button>
      <button className={`fullscreen-button`} onClick={onFullScreenButtonClick}></button>
    </div>
  );
};

MoviePlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

describe(`For movie video player`, () => {
  it(`Checks that pressing play button turn on video (play)`, () => {
    const PlayerWrapped = withVideo(MoviePlayer);
    const wrapper = mount(<PlayerWrapped
      isPlaying={false}
      videoSrc=""
      posterSrc=""
      type={`movie`}
    />);

    window.HTMLMediaElement.prototype.play = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.play-button`).simulate(`click`);

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`Checks that pressing pause button turn off video (pause)`, () => {
    const PlayerWrapped = withVideo(MoviePlayer);
    const wrapper = mount(<PlayerWrapped
      isPlaying={true}
      videoSrc=""
      posterSrc=""
      type={`movie`}
    />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `pause`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button.play-button`).simulate(`click`);

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });

  it(`Checks that pressing fullscreen button change state`, () => {
    const PlayerWrapped = withVideo(MoviePlayer);
    const wrapper = mount(<PlayerWrapped
      isPlaying={false}
      videoSrc=""
      posterSrc=""
      type={`movie`}
    />);

    wrapper.find(`button.fullscreen-button`).simulate(`click`);

    expect(wrapper.state(`isFullScreen`)).toBeTruthy();
  });

  it(`Checks that exit button works properly`, () => {
    const PlayerWrapped = withVideo(MoviePlayer);
    const wrapper = mount(<PlayerWrapped
      isPlaying={false}
      videoSrc=""
      posterSrc=""
      type={`movie`}
    />);

    wrapper.find(`button.fullscreen-button`).simulate(`click`);

    expect(wrapper.state(`isFullScreen`)).toBeTruthy();
  });
});
