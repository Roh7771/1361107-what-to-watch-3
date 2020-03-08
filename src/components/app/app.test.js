import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

const mock = {
  promoFilm: {
    promoFilmTitle: `Promo Film`,
    promoFilmGenre: `Comedy`,
    promoFilmReleaseYear: 2020,
    promoFilmVideoSrc: `some path`,
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

describe(`App should`, () => {
  it(`render main screen`, () => {
    const {filmsList, promoFilm} = mock;
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
            <App
              filmsToRender={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={(() => {})}
              onPlayFilmButtonClick={() => {}}
              login={() => {}}
              onSubmit={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              isLogging={false}
              changeLoggingStatus={() => {}}
              onSignInClick={() => {}}
              onReviewSend={() => {}}
              changeFormSendingStatus={() => {}}
              isFormSending={false}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render auth screen`, () => {
    const {filmsList, promoFilm} = mock;
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
            <App
              filmsToRender={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={(() => {})}
              onPlayFilmButtonClick={() => {}}
              login={() => {}}
              onSubmit={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              isLogging={true}
              changeLoggingStatus={() => {}}
              onSignInClick={() => {}}
              onReviewSend={() => {}}
              changeFormSendingStatus={() => {}}
              isFormSending={false}
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
      DATA: {
        filmsList
      },
      APP_STATUS: {
        currentGenre: `All genres`,
        chosenFilm: filmsList[1]
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              filmsToRender={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={() => {}}
              chosenFilm={filmsList[0]}
              onPlayFilmButtonClick={() => {}}
              login={() => {}}
              onSubmit={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              isLogging={false}
              changeLoggingStatus={() => {}}
              onSignInClick={() => {}}
              onReviewSend={() => {}}
              changeFormSendingStatus={() => {}}
              isFormSending={false}
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
              filmsToRender={filmsList}
              filmsList={filmsList}
              promoFilm={promoFilm}
              onMovieCardClick={() => {}}
              chosenFilm={filmsList[0]}
              onPlayFilmButtonClick={() => {}}
              filmToWatch={filmsList[0]}
              login={() => {}}
              onSubmit={() => {}}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              isLogging={false}
              changeLoggingStatus={() => {}}
              onSignInClick={() => {}}
              onReviewSend={() => {}}
              changeFormSendingStatus={() => {}}
              isFormSending={false}
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
