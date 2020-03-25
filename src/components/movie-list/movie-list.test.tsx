import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieList from "./movie-list";
import history from "../../history.js";
import {Router} from "react-router-dom";
import {Film} from "../../types.js";
import {noop} from '../../utils';

const mock: {filmsList: Film[]} = {
  filmsList: [
    {
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
      description: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
    },
    {
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
      description: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 3,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
    },
  ]
};

it(`<MovieList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieList
            filmsToRender={mock.filmsList}
            activeItem={mock.filmsList[0]}
            onActiveItemChange={noop}
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
