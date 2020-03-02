import React from "react";
import renderer from "react-test-renderer";
import TrailerVideoPlayer from "./trailer-video-player";

const mock = {
  isPlaying: true,
  videoSrc: `somePath`,
  posterSrc: `somePath`
};

it(`<TrailerVideoPlayer /> should render correctly`, () => {
  const {isPlaying, videoSrc, posterSrc} = mock;
  const tree = renderer
    .create(
        <TrailerVideoPlayer
          isPlaying={isPlaying}
          videoSrc={videoSrc}
          posterSrc={posterSrc}
        >
          <video/>
        </TrailerVideoPlayer>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
