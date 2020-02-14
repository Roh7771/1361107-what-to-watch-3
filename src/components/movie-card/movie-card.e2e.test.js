import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

const mock = {
  film: {
    title: `Any Cool Film`,
    imgSrc: `Some path`,
    id: 5
  }
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should title button be pressed`, () => {
  const handlerTitleButtonClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        onFilmMouseOver={() => {}}
        onFilmMouseOut={() => {}}
        film={mock.film}
        onTitleButtonClick={handlerTitleButtonClick}
      />
  );

  const titleButton = movieCard.find(`.small-movie-card__link`);

  titleButton.simulate(`click`);

  expect(handlerTitleButtonClick.mock.calls.length).toBe(1);
});

it(`HandlerOnMouseEnter get correct data`, () => {
  const handlerOnMouseEnter = jest.fn((...args) => [...args]);
  const film = {
    title: `Any Cool Film`,
    imgSrc: `Some path`,
    id: 5
  };

  const movieCard = shallow(
      <MovieCard
        film={mock.film}
        onFilmMouseOver={handlerOnMouseEnter}
        onFilmMouseOut={() => {}}
        onTitleButtonClick={() => {}}
      />
  );

  const card = movieCard.find(`article`);
  card.simulate(`mouseEnter`);

  expect(handlerOnMouseEnter.mock.calls.length).toBe(1);
  expect(handlerOnMouseEnter.mock.calls[0][0]).toMatchObject(film);
});

