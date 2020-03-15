import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";

const mock = {
  genreList: [`All genres`, `Horror`, `Comedy`]
};

it(`<GenreList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          currentGenre={`All genres`}
          onGenreButtonClick={() => {}}
          genreList = {mock.genreList}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
