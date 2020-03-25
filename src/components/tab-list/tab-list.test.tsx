import * as React from "react";
import * as renderer from "react-test-renderer";
import TabList from "./tab-list";
import {Film} from "../../types.js";
import {noop} from '../../utils';

const mock: { film: Film } = {
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
    isFavorite: false,
  },
};

it(`<TabList /> should render correctly`, () => {
  const {film} = mock;
  const tree = renderer
    .create(
        <TabList
          changeTab={noop}
          activeItem={``}
          film={film}
          filmComments={[]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
