import * as React from "react";
import MovieDetails from "../tabs/movie-details/movie-details";
import MovieReviews from "../tabs/movie-reviews/movie-reviews";
import MovieOverview from "../tabs/movie-overview/movie-overview";
import {Film, Comment, Tab} from "../../types";

interface Props {
  film: Film;
  activeItem: Tab;
  changeTab: (tab: Tab) => void;
  filmComments: Comment[];
}

const TabList: React.FunctionComponent<Props> = (props: Props) => {
  const {film, activeItem, changeTab, filmComments} = props;

  const renderTab = () => {
    switch (activeItem) {
      case Tab.MOVIE_OVERVIEW:
        return <MovieOverview film={film} />;

      case Tab.MOVIE_DETAILS:
        return <MovieDetails film={film} />;

      case Tab.MOVIE_REVIEWS:
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
              activeItem === Tab.MOVIE_OVERVIEW ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(Tab.MOVIE_OVERVIEW);
              }}
              className="movie-nav__link"
            >
              Overview
            </a>
          </li>
          <li
            className={`movie-nav__item${
              activeItem === Tab.MOVIE_DETAILS ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(Tab.MOVIE_DETAILS);
              }}
              className="movie-nav__link"
            >
              Details
            </a>
          </li>
          <li
            className={`movie-nav__item${
              activeItem === Tab.MOVIE_REVIEWS ? ` movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeTab(Tab.MOVIE_REVIEWS);
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
