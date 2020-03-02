import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";

const mockStore = configureStore([]);

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

describe(`App should`, () => {
  it(`render main screen`, () => {
    const {filmsList, promoFilm} = mock;
    const store = mockStore({
      currentGenre: `All genres`,
      filmsToRender: filmsList,
      filmsToShowCount: 8
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              filmsList={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={(() => {})}
              chosenFilm={null}
              onPlayFilmButtonClick={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render movie page screen`, () => {
    const {filmsList, promoFilm} = mock;
    const store = mockStore({
      currentGenre: `All genres`,
      filmsToRender: filmsList,
      filmsToShowCount: 8
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              filmsList={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={() => {}}
              chosenFilm={filmsList[0]}
              onPlayFilmButtonClick={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render movie video player`, () => {
    const {filmsList, promoFilm} = mock;
    const store = mockStore({
      currentGenre: `All genres`,
      filmsToRender: filmsList,
      filmsToShowCount: 8
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              filmsList={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={() => {}}
              chosenFilm={filmsList[0]}
              onPlayFilmButtonClick={() => {}}
              filmToWatch={filmsList[0]}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
