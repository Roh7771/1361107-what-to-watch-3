import * as React from "react";
import * as renderer from "react-test-renderer";
import {GenresList} from "./genres-list";
import {noop} from "../../utils";

const mock: {genreList: string[]} = {
  genreList: [`All genres`, `Horror`, `Comedy`]
};

it(`<GenreList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          currentGenre={`All genres`}
          onGenreButtonClick={noop}
          genreList = {mock.genreList}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
