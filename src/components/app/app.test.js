import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mock = {
  promoFilm: {
    promoFilmTitle: `Promo Film`,
    promoFilmGenre: `Comedy`,
    promoFilmReleaseYear: 2020,
  },
  filmsList: [
    {
      title: `Some Title`,
      genre: `Comedy`,
      releaseYear: 2015,
      imgSrc: `Some Path`,
      bgSrc: `iSome Path`,
      posterSrc: `Some Path`,
      ratingScore: 8.7,
      ratingCount: 230,
      description: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      videoSrc: `Some Path`,
      filmDuration: 99,
      reviews: [
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        }
      ]
    },
    {
      title: `Some Title`,
      genre: `Comedy`,
      releaseYear: 2015,
      imgSrc: `Some Path`,
      bgSrc: `iSome Path`,
      posterSrc: `Some Path`,
      ratingScore: 8.7,
      ratingCount: 230,
      description: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 4,
      videoSrc: `Some Path`,
      filmDuration: 99,
      reviews: [
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`,
        }
      ]
    },
  ]
};

it(`<App /> should render correctly`, () => {
  const {filmsList, promoFilm} = mock;
  const tree = renderer
    .create(<App
      filmsList={filmsList}
      promoFilm={promoFilm}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
