import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-list";

const mock = {
  filmsList: [
    {
      title: `Any Cool Film`,
      imgSrc: `Some path`,
      id: 5
    },
    {
      title: `Another Cool Film`,
      imgSrc: `Some path`,
      id: 9
    },
  ]
};

it(`<MovieList /> should render correctly`, () => {
  const tree = renderer
    .create(<MovieList filmsList={mock.filmsList} onMovieCardClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
