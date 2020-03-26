import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import {Film} from "../../types";

interface Props {
  filmsToRender: Film[];
  activeItem: Film;
  onActiveItemChange: () => void;
  changeTab: () => void;
}

const MovieList: React.FunctionComponent<Props> = (props: Props) => {
  const {filmsToRender, activeItem, onActiveItemChange, changeTab} = props;
  return filmsToRender.length === 0 ? (
    <p>There is no films :(</p>
  ) : (
    <React.Fragment>
      {filmsToRender.map((el) => {
        return (
          <MovieCard
            key={el.id}
            film={el}
            onFilmMouseOut={onActiveItemChange}
            onFilmMouseOver={onActiveItemChange}
            activeCard={activeItem}
            changeTab={changeTab}
          />
        );
      })}
    </React.Fragment>
  );
};

export default MovieList;
