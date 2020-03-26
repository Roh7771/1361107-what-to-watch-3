import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video";
import {noop} from '../../utils';
import {VideoPlayerType} from "../../types";

configure({adapter: new Adapter()});

interface TrailerPlayerProps {
  children: React.ReactNode;
}

const TrailerPlayer: React.FunctionComponent<TrailerPlayerProps> = (props: TrailerPlayerProps) => {
  const {children} = props;
  return <div>{children}</div>;
};

describe(`For trailer video player`, () => {
  it(`Checks that video turn on (play) when isPlaying prop becomes true`, () => {
    const PlayerWrapped = withVideo(TrailerPlayer);
    const wrapper = mount(
        <PlayerWrapped
          isPlaying={false}
          posterSrc=""
          videoSrc=""
          type={VideoPlayerType.TRAILER}
        />
    );

    window.HTMLMediaElement.prototype.play = noop;

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
          type={VideoPlayerType.TRAILER}
        />
    );

    window.HTMLMediaElement.prototype.load = noop;

    const {_videoRef} = wrapper.instance();

    jest.spyOn(_videoRef.current, `load`);

    wrapper.instance().componentDidMount();

    wrapper.setProps({isPlaying: false});

    expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
  });
});

interface MoviePlayerProps {
  children: React.ReactNode;
  onFullScreenButtonClick: () => void;
  onPlayButtonClick: () => void;
}

const MoviePlayer: React.FunctionComponent<MoviePlayerProps> = (props: MoviePlayerProps) => {
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

describe(`For movie video player`, () => {
  it(`Checks that pressing play button turn on video (play)`, () => {
    const PlayerWrapped = withVideo(MoviePlayer);
    const wrapper = mount(<PlayerWrapped
      isPlaying={false}
      videoSrc=""
      posterSrc=""
      type={VideoPlayerType.MOVIE}
    />);

    window.HTMLMediaElement.prototype.play = noop;

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
      type={VideoPlayerType.MOVIE}
    />);

    window.HTMLMediaElement.prototype.pause = noop;

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
      type={VideoPlayerType.MOVIE}
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
      type={VideoPlayerType.MOVIE}
    />);

    wrapper.find(`button.fullscreen-button`).simulate(`click`);

    expect(wrapper.state(`isFullScreen`)).toBeTruthy();
  });
});
