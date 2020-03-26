import * as React from "react";
import {Film} from "../../../types";

const getStarsListHtml = (stars: string[]) => {
  let newStarsList = [];
  stars
    .map((star, i) => [`${star}, `, <br key={`${i}-${star}`}></br>])
    .forEach((arr) => {
      newStarsList = newStarsList.concat(arr);
    });
  newStarsList.pop();
  newStarsList[newStarsList.length - 1] = newStarsList[
    newStarsList.length - 1
  ].slice(0, -2);
  return newStarsList;
};

interface Props {
  film: Film;
}

const convertFilmDuration = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

const MovieDetails: React.FunctionComponent<Props> = (props: Props) => {
  const {film} = props;
  const {director, starring, filmDuration, genre, releaseYear} = film;
  let newStarsList = [];
  starring
    .map((star, i) => [`${star}, `, <br key={`${i}-${star}`}></br>])
    .forEach((arr) => {
      newStarsList = newStarsList.concat(arr);
    });
  newStarsList.pop();
  newStarsList[newStarsList.length - 1] = newStarsList[
    newStarsList.length - 1
  ].slice(0, -2);
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {getStarsListHtml(starring)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">
            {convertFilmDuration(filmDuration)}
          </span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{releaseYear}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
