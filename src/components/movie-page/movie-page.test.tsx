import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePage from "./movie-page";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Film, Tab} from "../../types";
import {noop} from '../../utils';

const mockStore = configureStore([]);

const mock: {film: Film; filmsList: Film[]} = {
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
    descriptionList: [
      `Some description`,
    ],
    director: `Some cool directot`,
    starring: [`Actor1`, `Actor2`],
    id: 2,
    videoSrc: `Some Path`,
    filmDuration: 99,
    isFavorite: false,
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
      descriptionList: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
    },
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
      descriptionList: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
    },
  ]
};

it(`<MoviePage /> should render for unauthorized user correctly`, () => {
  const {film, filmsList} = mock;
  const store = mockStore({
    DATA: {
      filmsList
    },
    APP_STATUS: {
      chosenFilm: film
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MoviePage
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              onActiveItemChange={noop}
              onFavoriteButtonClick={noop}
              isFilmsLoading={false}
              setFilmComments={noop}
              activeItem={Tab.MOVIE_OVERVIEW}
              film={film}
              filmComments={[]}
            >
              <footer>Some footer</footer>
            </MoviePage>
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`<MoviePage /> should render for authorized user correctly`, () => {
  const {film, filmsList} = mock;
  const store = mockStore({
    DATA: {
      filmsList
    },
    APP_STATUS: {
      chosenFilm: film
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MoviePage
              authorizationStatus={AuthorizationStatus.AUTH}
              onActiveItemChange={noop}
              onFavoriteButtonClick={noop}
              isFilmsLoading={false}
              setFilmComments={noop}
              activeItem={Tab.MOVIE_OVERVIEW}
              film={film}
              filmComments={[]}
            >
              <footer>Some footer</footer>
            </MoviePage>
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
