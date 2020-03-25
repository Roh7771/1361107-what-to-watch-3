import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {Router} from "react-router-dom";
import history from "../../history";
import {Film} from "../../types";

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
    description: [`Some description`],
    director: `Some cool directot`,
    starring: [`Actor1`, `Actor2`],
    id: 2,
    videoSrc: `Some Path`,
    filmDuration: 99,
    isFavorite: false
  }
};

const fnMock = () => {};

it(`<AddReview /> should render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <AddReview
            {...mock}
            onActiveItemChange={fnMock}
            onTextChange={fnMock}
            activeItem={3}
            onReviewSend={fnMock}
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
