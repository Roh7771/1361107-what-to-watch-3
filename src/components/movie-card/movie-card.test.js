import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";

const mock = {
  film: {
    title: `Some Title`,
    genre: `Comedy`,
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
  }
};

it(`<MovieCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <MovieCard
          film={mock.film}
          onFilmMouseOut={() => {}}
          onFilmMouseOver={() => {}}
          onMovieCardClick={() => {}}
          activeCard={mock.film}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
