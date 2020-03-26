import {reducer, ActionCreators, ActionTypes, Operation} from "./data";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {AppRoute} from "../../const";
import {noop} from "../../utils";

const api = createAPI(
    noop,
    noop
);

const mock = {
  filmsFromServer: [
    {
      name: `Some Title`,
      [`preview_video_link`]: `some path`,
      genre: `Comedy`,
      [`background_color`]: `red`,
      released: 2015,
      [`preview_image`]: `Some Path`,
      [`background_image`]: `iSome Path`,
      [`poster_image`]: `Some Path`,
      [`rating`]: 8.7,
      [`scores_count`]: 230,
      description: `Some description`,
      director: `Some cool directot`,
      starring: [`Actor1`, `Actor2`],
      id: 2,
      [`video_link`]: `Some Path`,
      [`run_time`]: 99,
      [`is_favorite`]: false
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
    descriptionList: [`Some description`],
    director: `Some cool directot`,
    starring: [`Actor1`, `Actor2`],
    id: 2,
    videoSrc: `Some Path`,
    filmDuration: 99,
    isFavorite: false
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
      descriptionList: [`Some description`],
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
      isFavorite: false,
      genre: `Comedy`,
      releaseYear: 2015,
      imgSrc: `Some Path`,
      bgSrc: `iSome Path`,
      posterSrc: `Some Path`,
      ratingScore: 8.7,
      bgColor: `red`,
      ratingCount: 230,
      descriptionList: [`Some description`],
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
          reviewDate: `2016-12-25`
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`
        },
        {
          rating: 8.1,
          reviewText: `Description`,
          reviewer: `Kate Muiry`,
          reviewDate: `2016-12-25`
        }
      ]
    }
  ],
  filmComments: [
    {
      id: 1,
      user: {
        id: 1,
        name: `Some User`
      },
      rating: 9,
      comment: `Some comment`,
      date: `Sun Mar 15 2020`
    }
  ]
};

describe(`Reducer`, () => {
  const {promoFilm, filmsList, filmComments} = mock;
  it(`returns initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      filmsList: [],
      promoFilm: {},
      userFavoriteFilms: [],
      filmComments: []
    });
  });

  it(`sets films`, () => {
    expect(
        reducer(
            {filmsList: []},
            {type: ActionTypes.LOAD_FILMS, payload: filmsList}
        )
    ).toEqual({filmsList});
  });

  it(`sets promo films`, () => {
    expect(
        reducer(
            {promoFilm: {}},
            {type: ActionTypes.LOAD_PROMO_FILM, payload: promoFilm}
        )
    ).toEqual({promoFilm});
  });

  it(`sets favorite films`, () => {
    expect(
        reducer(
            {userFavoriteFilms: []},
            {type: ActionTypes.GET_FAVORITE_FILMS, payload: filmsList}
        )
    ).toEqual({userFavoriteFilms: filmsList});
  });

  it(`update film favorite status`, () => {
    expect(
        reducer(
            {filmsList, promoFilm},
            {type: ActionTypes.UPDATE_FILM_FAVORITE_STATUS, payload: 4}
        ).filmsList[1].isFavorite
    ).toBeTruthy();
  });

  it(`sets film comments`, () => {
    expect(
        reducer(
            {filmComments: []},
            {type: ActionTypes.GET_FILM_COMMENTS, payload: filmComments}
        )
    ).toEqual({filmComments});
  });
});

describe(`ActionCreators`, () => {
  const {promoFilm, filmsList, filmComments} = mock;
  it(`for getting film comments returns correct action`, () => {
    expect(ActionCreators.getFilmComments(filmComments)).toEqual({
      type: ActionTypes.GET_FILM_COMMENTS,
      payload: filmComments
    });
  });

  it(`for updating film favorite status returns correct action`, () => {
    expect(ActionCreators.updateFilmFavoriteStatus(2)).toEqual({
      type: ActionTypes.UPDATE_FILM_FAVORITE_STATUS,
      payload: 2
    });
  });

  it(`for getting favorite films returns correct action`, () => {
    expect(ActionCreators.getFavoriteFilms(filmsList)).toEqual({
      type: ActionTypes.GET_FAVORITE_FILMS,
      payload: filmsList
    });
  });

  it(`for loading promo film returns correct action`, () => {
    expect(ActionCreators.loadPromoFilm(promoFilm)).toEqual({
      type: ActionTypes.LOAD_PROMO_FILM,
      payload: promoFilm
    });
  });

  it(`for loading films returns correct action`, () => {
    expect(ActionCreators.loadFilms(filmsList)).toEqual({
      type: ActionTypes.LOAD_FILMS,
      payload: filmsList
    });
  });
});

describe(`Operation`, () => {
  const {promoFilm, filmsList, filmComments, filmsFromServer} = mock;

  it(`getFilmComments should make a correct API call to /comments/:filmId`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsGetter = Operation.getFilmComments(1);

    apiMock.onGet(`/comments/1`).reply(200, filmComments);

    return commentsGetter(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.GET_FILM_COMMENTS,
        payload: filmComments
      });
    });
  });

  it(`getFavoriteFilms should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteFilmsGetter = Operation.getFavoriteFilms();

    apiMock.onGet(`/favorite`).reply(200, filmsFromServer);

    return favoriteFilmsGetter(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.GET_FAVORITE_FILMS,
        payload: [filmsList[0]]
      });
    });
  });

  it(`loadPromoFilm should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock.onGet(`${AppRoute.FILM}/promo`).reply(200, filmsFromServer[0]);

    return promoFilmLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.LOAD_PROMO_FILM,
        payload: promoFilm
      });
    });
  });

  it(`loadFilms should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock.onGet(`${AppRoute.FILM}`).reply(200, filmsFromServer);

    return filmsLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.LOAD_FILMS,
        payload: [filmsList[0]]
      });
    });
  });

  it(`sendReview should make a correct API call to /comments/:filmId`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewSender = Operation.sendReview(1, `text`, 8);

    apiMock.onPost(`/comments/1`).reply(200);

    return reviewSender(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it(`setFilmFavoriteStatus should make a correct API call to /favorite/:id/:value`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmFavoriteStatusSetter = Operation.setFilmFavoriteStatus(2, 1);

    apiMock.onPost(`/favorite/2/1`).reply(200, filmsList[0]);

    return filmFavoriteStatusSetter(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionTypes.UPDATE_FILM_FAVORITE_STATUS,
        payload: 2
      });
    });
  });
});
