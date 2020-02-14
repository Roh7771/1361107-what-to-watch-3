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

it(`<Main /> should render correctly`, () => {
  const tree = renderer
    .create(<MovieList filmsList={mock.filmsList} onTitleButtonClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
