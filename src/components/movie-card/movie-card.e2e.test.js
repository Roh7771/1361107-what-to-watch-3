import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

window.scrollTo = jest.fn();

const mock = {
  film: {
    title: `Some Title`,
    genre: `Comedy`,
    trailerSrc: `some path`,
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

it(`ChangeTab get correct data`, () => {
  const changeTab = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        film={mock.film}
        onFilmMouseOver={() => {}}
        onFilmMouseOut={() => {}}
        activeCard={mock.film}
        changeTab={changeTab}
      />
  );

  const card = movieCard.find(`article`);
  card.simulate(`click`);

  setTimeout(() => {
    expect(changeTab.mock.calls.length).toBe(1);
    expect(changeTab.mock.calls[0][0]).toBe(`movieOverview`);
  }, 1100);
  window.scrollTo.mockClear();
});

it(`HandlerOnMouseEnter get correct data`, () => {
  const handlerOnMouseEnter = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        film={mock.film}
        onFilmMouseOver={handlerOnMouseEnter}
        onFilmMouseOut={() => {}}
        activeCard={mock.film}
      />
  );

  const card = movieCard.find(`article`);
  card.simulate(`mouseEnter`);

  setTimeout(() => {
    expect(handlerOnMouseEnter.mock.calls.length).toBe(1);
    expect(handlerOnMouseEnter.mock.calls[0][0]).toMatchObject(mock.film);
  }, 1100);
});
