import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`<GenreList />`, () => {
  it(`should mark active genre correctly`, () => {
    const genresList = shallow(
        <GenresList
          onGenreButtonClick={() => {}}
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
          onGenreButtonClick={onGenreButtonClick}
          currentGenre={`Comedy`}
        />
    );

    const secondButton = genresList.find(`.catalog__genres-link`).at(1);
    secondButton.simulate(`click`, {preventDefault() {}});
    expect(onGenreButtonClick.mock.calls[0][0]).toBe(secondButton.text());
  });
});
