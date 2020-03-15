import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const mock = {
  userFavoriteFilms: [
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
    }
  ],
  promoFilm: {
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
    },
  ]
};

it(`<Main /> should render unauthorized user correctly`, () => {
  const {promoFilm, filmsList, userFavoriteFilms} = mock;
  const store = mockStore({
    DATA: {
      filmsList,
      promoFilm
    },
    APP_STATUS: {
      currentGenre: `All genres`,
      filmsToShowCount: 8,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              filmsToRender={filmsList}
              userFavoriteFilms={userFavoriteFilms}
              promoFilm={promoFilm}
              onFavoriteButtonClick={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
            >
              <footer>Some footer</footer>
            </Main>
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`<Main /> should render unauthorized user correctly`, () => {
  const {promoFilm, filmsList, userFavoriteFilms} = mock;
  const store = mockStore({
    DATA: {
      filmsList,
      promoFilm
    },
    APP_STATUS: {
      currentGenre: `All genres`,
      filmsToShowCount: 8,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              filmsToRender={filmsList}
              userFavoriteFilms={userFavoriteFilms}
              promoFilm={promoFilm}
              onFavoriteButtonClick={() => {}}
              authorizationStatus={AuthorizationStatus.AUTH}
            >
              <footer>Some footer</footer>
            </Main>
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
