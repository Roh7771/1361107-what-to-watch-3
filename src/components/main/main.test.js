import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

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

it(`<Main /> should render correctly`, () => {
  const tree = renderer
    .create(<Main
      filmsList={mock.filmsList}
      promoFilm={mock.promoFilm}
      onTitleButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
