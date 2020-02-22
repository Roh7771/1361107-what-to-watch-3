import React from "react";
import renderer from "react-test-renderer";
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
          currentGenre={`Comedies`}
        />
    );

    const activeButton = genresList.find(`.catalog__genres-item--active`);
    expect(activeButton.text()).toBe(`Comedies`);
  });

  it(`should pass correct data when any link has been pressed`, () => {
    const onGenreButtonClick = jest.fn();

    const genresList = shallow(
        <GenresList
          onGenreButtonClick={onGenreButtonClick}
          currentGenre={`Comedies`}
        />
    );

    const secondButton = genresList.find(`.catalog__genres-link`).at(1);
    secondButton.simulate(`click`, {preventDefault() {}});
    expect(onGenreButtonClick.mock.calls[0][0]).toBe(secondButton.text());
  });
});

it(`<GenreList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          currentGenre={`All genres`}
          onGenreButtonClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
