import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const mock = {
  promoFilm: {
    promoFilmTitle: `Promo Film`,
    promoFilmGenre: `Comedy`,
    promoFilmReleaseYear: 2020,
  },
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

it(`<App /> should render correctly`, () => {
  const tree = renderer
    .create(<App
      filmsList={mock.filmsList}
      promoFilm={mock.promoFilm}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
