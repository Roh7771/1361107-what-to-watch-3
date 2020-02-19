import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";

const mock = {
  isPlaying: false,
  videoSrc: `somePath`,
  posterSrc: `somePath`
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should video player have "play" and "pause" state`, () => {
  const {isPlaying, videoSrc, posterSrc} = mock;

  const videoPlayer = mount(
      <VideoPlayer
        isPlaying={isPlaying}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
      />
  );

  expect(videoPlayer.find(`.pause`).length).toBe(1);

  videoPlayer.setState({isPlaying: true});

  expect(videoPlayer.find(`.play`).length).toBe(1);
});

it(`Should video player plays when isPlaying props equals true`, () => {
  const {videoSrc, posterSrc} = mock;
  const isPlaying = true;

  const videoPlayer = mount(
      <VideoPlayer
        isPlaying={isPlaying}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
      />
  );

  expect(videoPlayer.state(`isPlaying`)).toBe(true);
});

it(`Shouldn't video player plays when isPlaying props equals false`, () => {
  const {isPlaying, videoSrc, posterSrc} = mock;

  const videoPlayer = mount(
      <VideoPlayer
        isPlaying={isPlaying}
        videoSrc={videoSrc}
        posterSrc={posterSrc}
      />
  );

  expect(videoPlayer.state(`isPlaying`)).toBe(false);
});
