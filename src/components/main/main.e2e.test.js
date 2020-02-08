import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

let testId = 10;

const Settings = {
  PROMO_FILM: {
    promoFilmTitle: `Promo Film`,
    promoFilmGenre: `Comedy`,
    promoFilmReleaseYear: 2020,
  },
  FILMS_LIST: [
    {
      filmTitle: `First Film`,
      filmId: testId++
    },
    {
      filmTitle: `Second Film`,
      filmId: testId++
    },
    {
      filmTitle: `Third Film`,
      filmId: testId++
    }
  ]
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title button be pressed`, () => {
  const titleButtonHandler = jest.fn();

  const main = shallow(
      <Main
        filmsList={Settings.FILMS_LIST}
        promoFilm={Settings.PROMO_FILM}
        onTitleButtonClick={titleButtonHandler}
      />
  );

  const titleButton = main.find(`a.small-movie-card__link`);

  titleButton.forEach((node) => {
    node.simulate(`click`);
  });

  expect(titleButtonHandler.mock.calls.length).toBe(3);
});
