import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review";
import {Router} from "react-router-dom";
import history from "../../history";

const mock = {
  text: `Some Review`,
  reviewedFilm: {
    title: `Some Title`,
    posterSrc: `Some Path`,
    bgSrc: `Some Path`,
    id: 1,
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
          >
            <video/>
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
