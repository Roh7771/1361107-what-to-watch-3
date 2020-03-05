import React from "react";
import renderer from "react-test-renderer";
import {MoreLikeThis} from "./more-like-this.jsx";

const mock = {
  film: {
    title: `Some Title`,
    trailerSrc: `some path`,
    genre: `Comedy`,
    bgColor: `red`,
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
  filmsList: [
    {
      title: `Some Title`,
      trailerSrc: `some path`,
      genre: `Comedy`,
      bgColor: `red`,
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
      trailerSrc: `some path`,
      genre: `Comedy`,
      releaseYear: 2015,
      imgSrc: `Some Path`,
      bgSrc: `iSome Path`,
      posterSrc: `Some Path`,
      ratingScore: 8.7,
      bgColor: `red`,
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

it(`<MoreLikeThis /> should render correctly`, () => {
  const {film, filmsList} = mock;
  const tree = renderer
    .create(<MoreLikeThis filmsToRender={filmsList} onMovieCardClick={() => {}} currentFilm={film}/>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
