import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {MemoryRouter} from "react-router-dom";
import {Film} from "../../types.js";
import {noop} from "../../utils";

const mockStore = configureStore([]);

const mock: {userFavoriteFilms: Film[]; promoFilm: Film; filmsList: Film[] } = {
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
      descriptionList: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
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
      isFavorite: false
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
      descriptionList: [
        `Some description`,
      ],
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 4,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false
    },
  ]
};

describe(`App should`, () => {
  it(`render main screen`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[AppRoute.ROOT]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>,
          {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render auth screen`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render movie page screen`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[`${AppRoute.FILM}/2`]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render movie video player`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[`${AppRoute.PLAYER}/2`]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render user favorite films`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[`${AppRoute.MY_LIST}`]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render review form`, () => {
    const {filmsList, promoFilm, userFavoriteFilms} = mock;
    const store = mockStore({
      DATA: {
        filmsList,
        promoFilm,
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        filmsToShowCount: 8,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MemoryRouter initialEntries={[`${AppRoute.FILM}/2/review`]}>
              <App
                filmsToRender={filmsList}
                userFavoriteFilms={userFavoriteFilms}
                allFilms={filmsList}
                promoFilm={promoFilm}
                onLoginFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                onFavoriteButtonClick={noop}
                onReviewSend={noop}
                isFormSending={false}
                isFilmsLoading={false}
                setFilmComments={noop}
                formErrorMessage={null}
                filmComments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
