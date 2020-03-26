import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list";
import {noop} from "../../utils";

configure({
  adapter: new Adapter()
});

const mock: {genreList: string[]} = {
  genreList: [`All genres`, `Horror`, `Comedy`]
};

describe(`<GenreList />`, () => {
  it(`should mark active genre correctly`, () => {
    const genresList = shallow(
        <GenresList
          genreList = {mock.genreList}
          onGenreButtonClick={noop}
          currentGenre={`Comedy`}
        />
    );

    const activeButton = genresList.find(`.catalog__genres-item--active`);
    expect(activeButton.text()).toBe(`Comedy`);
  });

  it(`should pass correct data when any link has been pressed`, () => {
    const onGenreButtonClick = jest.fn();

    const genresList = shallow(
        <GenresList
          genreList = {mock.genreList}
          onGenreButtonClick={onGenreButtonClick}
          currentGenre={`Comedy`}
        />
    );

    const secondButton = genresList.find(`.catalog__genres-link`).at(1);
    secondButton.simulate(`click`, {preventDefault: noop});
    expect(onGenreButtonClick.mock.calls[0][0]).toBe(secondButton.text());
  });
});
