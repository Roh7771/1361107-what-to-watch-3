import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieVideoPlayer from "./movie-video-player";
import {noop} from '../../utils';
import {VideoPlayerType} from "../../types";

const mock: {
  progressInPercent: number;
  progressInSeconds: number;
  isPlaying: boolean;
  title: string;
  isFullScreen: boolean;
} = {
  progressInPercent: 0,
  progressInSeconds: 0,
  isPlaying: false,
  title: `Some title`,
  isFullScreen: false
};

it(`<MovieVideoPlayer /> should render trailer player`, () => {
  const tree = renderer
    .create(
        <MovieVideoPlayer
          {...mock}
          onFullScreenButtonClick={noop}
          onPlayButtonClick={noop}
          type={VideoPlayerType.TRAILER}
        >
          <video />
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

it(`<MovieVideoPlayer /> should render full movie player`, () => {
  const tree = renderer
    .create(
        <MovieVideoPlayer
          {...mock}
          onFullScreenButtonClick={noop}
          onPlayButtonClick={noop}
          type={VideoPlayerType.MOVIE}
        >
          <video />
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
