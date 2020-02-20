import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TabList from "./tab-list.jsx";

const mock = {
  film: {
    title: `Some Title`,
    genre: `Comedy`,
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
  }
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should change change tab after tab button click`, () => {
  const tabList = shallow(
      <TabList film={mock.film}/>
  );

  expect(tabList.state(`currentTab`)).toBe(`movieOverview`);

  const secondTabButton = tabList.find(`.movie-nav__link`).at(1);
  secondTabButton.simulate(`click`, {preventDefault() {}});

  expect(tabList.state(`currentTab`)).toBe(`movieDetails`);
});

