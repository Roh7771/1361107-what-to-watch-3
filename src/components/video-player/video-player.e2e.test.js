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
