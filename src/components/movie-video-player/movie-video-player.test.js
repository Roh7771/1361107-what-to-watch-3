import React from "react";
import renderer from "react-test-renderer";
import MovieVideoPlayer from "./movie-video-player";

const mock = {
  progressInPercent: 0,
  progressInSeconds: 0,
  isPlaying: false,
  title: `Some title`,
  isFullScreen: false,
};

it(`<TrailerVideoPlayer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <MovieVideoPlayer
          {...mock}
          onFullScreenButtonClick={() => {}}
          onPlayButtonClick={() => {}}
          onPlayFilmButtonClick={() => {}}
        >
          <video/>
        </MovieVideoPlayer>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
