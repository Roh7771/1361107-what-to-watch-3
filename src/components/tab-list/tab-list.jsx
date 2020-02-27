import React from "react";
import PropTypes from "prop-types";
import MovieDetails from "../tabs/movie-details/movie-details.jsx";
import MovieReviews from "../tabs/movie-reviews/movie-reviews.jsx";
import MovieOverview from "../tabs/movie-overview/movie-overview.jsx";

const TabList = (props) => {
  const {film, activeItem, onActiveItemChange} = props;

  const renderTab = () => {
    switch (activeItem) {
      case `movieOverview`:
        return <MovieOverview film={film}/>;

      case `movieDetails`:
        return <MovieDetails film={film}/>;

      case `movieReviews`:
        return <MovieReviews film={film}/>;
    }
    return <p>Что-то пошло не так :(</p>;
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item${activeItem === `movieOverview` ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onActiveItemChange(`movieOverview`);
              }}
              className="movie-nav__link"
            >
              Overview
            </a>
          </li>
          <li className={`movie-nav__item${activeItem === `movieDetails` ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onActiveItemChange(`movieDetails`);
              }}
              className="movie-nav__link"
            >
              Details
            </a>
          </li>
          <li className={`movie-nav__item${activeItem === `movieReviews` ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onActiveItemChange(`movieReviews`);
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

TabList.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    imgSrc: PropTypes.string,
    bgSrc: PropTypes.string,
    posterSrc: PropTypes.string,
    ratingScore: PropTypes.number,
    ratingCount: PropTypes.number,
    description: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
    filmDuration: PropTypes.number,
    reviews: PropTypes.array,
  }),
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
};

export default TabList;
