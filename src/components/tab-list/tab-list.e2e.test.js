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

  expect(tabList.state(`currentTab`)).toBe(`inList`);

  const secondTabButton = tabList.find(`.movie-nav__link`).at(1);
  secondTabButton.simulate(`click`, {preventDefault() {}});

  expect(tabList.state(`currentTab`)).toBe(`details`);
});

// it(`Should movie card and title be pressed and got correct data`, () => {
//   const handlerMovieCardClick = jest.fn();

//   const movieCard = shallow(
//       <MovieCard
//         onFilmMouseOver={() => {}}
//         onFilmMouseOut={() => {}}
//         film={mock.film}
//         onMovieCardClick={handlerMovieCardClick}
//         activeCard={mock.film}
//       />
//   );

//   const titleButton = movieCard.find(`a.small-movie-card__link`);
//   const movieCardWrapper = movieCard.find(`article`);

//   titleButton.simulate(`click`, {preventDefault() {}});
//   movieCardWrapper.simulate(`click`);

//   expect(handlerMovieCardClick.mock.calls.length).toBe(2);
//   expect(handlerMovieCardClick.mock.calls[0][0]).toMatchObject(mock.film);
//   expect(handlerMovieCardClick.mock.calls[1][0]).toMatchObject(mock.film);
// });

// it(`HandlerOnMouseEnter get correct data`, () => {
//   const handlerOnMouseEnter = jest.fn((...args) => [...args]);

//   const movieCard = shallow(
//       <MovieCard
//         film={mock.film}
//         onFilmMouseOver={handlerOnMouseEnter}
//         onFilmMouseOut={() => {}}
//         onMovieCardClick={() => {}}
//         activeCard={mock.film}
//       />
//   );

//   const card = movieCard.find(`article`);
//   card.simulate(`mouseEnter`);

//   expect(handlerOnMouseEnter.mock.calls.length).toBe(1);
//   expect(handlerOnMouseEnter.mock.calls[0][0]).toMatchObject(mock.film);
// });

