import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {Film} from "../../types";
import {noop} from '../../utils';

window.scrollTo = jest.fn();

const mock: {film: Film} = {
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
    descriptionList: [
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

configure({
  adapter: new Adapter()
});

it(`ChangeTab get correct data`, () => {
  const changeTab = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        film={mock.film}
        onFilmMouseOver={noop}
        onFilmMouseOut={noop}
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
});

it(`HandlerOnMouseEnter get correct data`, () => {
  const handlerOnMouseEnter = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        film={mock.film}
        onFilmMouseOver={handlerOnMouseEnter}
        onFilmMouseOut={noop}
        activeCard={mock.film}
        changeTab={noop}
      />
  );

  const card = movieCard.find(`article`);
  card.simulate(`mouseEnter`);

  setTimeout(() => {
    expect(handlerOnMouseEnter.mock.calls.length).toBe(1);
    expect(handlerOnMouseEnter.mock.calls[0][0]).toMatchObject(mock.film);
  }, 1100);
});
