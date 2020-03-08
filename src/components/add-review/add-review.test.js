import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review";

const mock = {
  text: `Some Review`,
  movieTitle: `Some Title`,
  moviePoster: `Some Path`,
  movieBg: `Some Path`,
  id: 1,
};

const fnMock = () => {};

it(`<AddReview /> should render correctly`, () => {
  const tree = renderer
    .create(
        <AddReview
          {...mock}
          onActiveItemChange={fnMock}
          onTextChange={fnMock}
          activeItem={3}
          onReviewSend={fnMock}
          changeFormSendingStatus={fnMock}
          isFormSending={false}
        >
          <video/>
        </AddReview>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
