import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieOverview from "./movie-overview";
import {Film} from "../../../types.js";

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

it(`<MovieOverview /> should render correctly`, () => {
  const {film} = mock;
  const tree = renderer
    .create(<MovieOverview film={film}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
