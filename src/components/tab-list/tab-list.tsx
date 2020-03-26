import * as React from "react";
import MovieDetails from "../tabs/movie-details/movie-details";
import MovieReviews from "../tabs/movie-reviews/movie-reviews";
import MovieOverview from "../tabs/movie-overview/movie-overview";
import {Film, Comment} from "../../types";

interface Props {
  film: Film;
  activeItem: string;
  changeTab: (tab: string) => void;
  filmComments: Comment[];
}

const TabList: React.FunctionComponent<Props> = (props: Props) => {
  const {film, activeItem, changeTab, filmComments} = props;

  const renderTab = () => {
    switch (activeItem) {
      case `movieOverview`:
        return <MovieOverview film={film} />;

      case `movieDetails`:
        return <MovieDetails film={film} />;

      case `movieReviews`:
        return <MovieReviews filmComments={filmComments} />;
    }
    return <p>Что-то пошло не так :(</p>;
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li
            className={`movie-nav__item${
              activeItem === `movieOverview` ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(`movieOverview`);
              }}
              className="movie-nav__link"
            >
              Overview
            </a>
          </li>
          <li
            className={`movie-nav__item${
              activeItem === `movieDetails` ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(`movieDetails`);
              }}
              className="movie-nav__link"
            >
              Details
            </a>
          </li>
          <li
            className={`movie-nav__item${
              activeItem === `movieReviews` ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(`movieReviews`);
              }}
              className="movie-nav__link"
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>
      {renderTab()}
    </div>
  );
};


export default TabList;
