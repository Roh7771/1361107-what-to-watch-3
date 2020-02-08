import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

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

it(`<Albums /> should render Cinderella`, () => {
  const tree = renderer
    .create(<Main
      filmsList={Settings.FILMS_LIST}
      promoFilm={Settings.PROMO_FILM}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
