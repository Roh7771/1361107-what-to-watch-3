import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page";

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
    id: 2
  }
};

it(`<MoviePage /> should render correctly`, () => {
  const tree = renderer
    .create(<MoviePage film={mock.film}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
