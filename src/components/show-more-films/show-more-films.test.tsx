import * as React from "react";
import * as renderer from "react-test-renderer";
import {ShowMoreFilms} from "./show-more-films";
import {Film} from "../../types";
import {noop} from "../../utils";

const mock: {filmsList: Film[]} = {
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


it(`<ShowMoreFilms /> should render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMoreFilms
          filmsToShowCount={1}
          onMoreFilmsButtonClick={noop}
          filmsToRender={mock.filmsList}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
