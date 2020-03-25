import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews";

it(`<MovieReviews /> should render correctly`, () => {
  const tree = renderer
    .create(<MovieReviews filmComments={[]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
