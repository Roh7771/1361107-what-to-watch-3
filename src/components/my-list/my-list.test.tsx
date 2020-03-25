import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history.js";
import MyList from "./my-list";
import {Film} from "../../types.js";

const mockStore = configureStore([]);

const mock: {userFavoriteFilms: Film[]} = {
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
      id: 3,
      videoSrc: `Some Path`,
      filmDuration: 99,
      isFavorite: false,
    },
  ]
};

it(`<MyList /> should render correctly`, () => {
  const {userFavoriteFilms} = mock;
  const store = mockStore({
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MyList
              userFavoriteFilms={userFavoriteFilms}
            >
              <footer>Some footer</footer>
            </MyList>
          </Router>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
