import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import history from "../../history.js";
import {Router} from "react-router-dom";
import {Film} from "../../types.js";
import {noop} from '../../utils';

const mock: {film: Film} = {
  film: {
    title: `Some Title`,
    trailerSrc: `some path`,
    genre: `Comedy`,
    bgColor: `red`,
    releaseYear: 2015,
    imgSrc: `Some Path`,
    bgSrc: `iSome Path`,
    posterSrc: `Some Path`,
    ratingScore: 8.7,
    ratingCount: 230,
    descriptionList: [
      `Some description`,
    ],
    director: `Some cool directot`,
    starring: [`Actor1`, `Actor2`],
    id: 2,
    videoSrc: `Some Path`,
    filmDuration: 99,
    isFavorite: false,
  },
};

it(`<MovieCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieCard
            film={mock.film}
            onFilmMouseOut={noop}
            onFilmMouseOver={noop}
            activeCard={mock.film}
            changeTab={noop}
          />
        </Router>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
