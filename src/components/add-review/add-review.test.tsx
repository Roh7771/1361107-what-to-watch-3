import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {Router} from "react-router-dom";
import history from "../../history";
import {Film} from "../../types";
import {noop} from "../../utils";

const mock: { text: string; reviewedFilm: Film } = {
  text: `Some Review`,
  reviewedFilm: {
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
  }
};

it(`<AddReview /> should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <AddReview
            {...mock}
            onActiveItemChange={noop}
            onTextChange={noop}
            activeItem={3}
            onReviewSend={noop}
            isFormSending={false}
            formErrorMessage={null}
          >
            <video />
          </AddReview>
        </Router>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
