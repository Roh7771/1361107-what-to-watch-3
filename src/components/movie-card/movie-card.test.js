import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";

const mock = {
  film: {
    title: `Any Cool Film`,
    imgSrc: `Some path`,
    id: 5
  }
};

it(`<Main /> should render correctly`, () => {
  const tree = renderer
    .create(
        <MovieCard
          film={mock.film}
          onFilmMouseOut={() => {}}
          onFilmMouseOver={() => {}}
          onTitleButtonClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
