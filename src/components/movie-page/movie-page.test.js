import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

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

it(`<MoviePage /> should render correctly`, () => {
  const {film, filmsList} = mock;
  const store = mockStore({
    DATA: {
      filmsList,
    },
    APP_STATUS: {
      chosenFilm: film,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage onPlayFilmButtonClick={() => {}} filmsList={filmsList} onMovieCardClick={() => {}} film={film}/>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
