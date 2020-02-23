import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ShowMoreFilms} from "./show-more-films.jsx";

const mock = {
  filmsList: [
    {
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
    },
    {
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
      id: 4,
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
  ]
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Show more films button`, () => {
  const showMoreFilmsWrapper = (filmsToShowCount, onMoreFilmsButtonClick, filmsToRender) => {
    return shallow(
        <ShowMoreFilms
          onMoreFilmsButtonClick={onMoreFilmsButtonClick}
          filmsToRender={filmsToRender}
          filmsToShowCount={filmsToShowCount}
        />
    );
  };

  it(`exists and works when filmsList length bigger than filmsToShowCount`, () => {
    const onMoreFilmsButtonClick = jest.fn();

    const showMoreFilms = showMoreFilmsWrapper(1, onMoreFilmsButtonClick, mock.filmsList);

    const showMoreFilmsButton = showMoreFilms.find(`.catalog__button`);

    showMoreFilmsButton.simulate(`click`);

    expect(onMoreFilmsButtonClick.mock.calls.length).toBe(1);
    expect(showMoreFilmsButton.prop(`style`)).toBeFalsy();
  });

  it(`shouldn't exist when films list is small`, () => {
    expect(showMoreFilmsWrapper(8, ()=>{}, mock.filmsList).find(`.catalog__more`).prop(`style`)).toHaveProperty(`display`, `none`);
  });

  it(`shouldn't exist when films list is empty`, () => {
    expect(showMoreFilmsWrapper(8, ()=>{}, []).find(`.catalog__more`).prop(`style`)).toHaveProperty(`display`, `none`);
  });
});
