import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieDetails from "../tabs/movie-details/movie-details.jsx";
import MovieReviews from "../tabs/movie-reviews/movie-reviews.jsx";
import MovieOverview from "../tabs/movie-overview/movie-overview.jsx";

class TabList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: `movieOverview`,
    };
  }

  _handleTabClick(clickedTab) {
    this.setState({currentTab: clickedTab});
  }

  _renderTab(currentTab, film) {
    switch (currentTab) {
      case `movieOverview`:
        return <MovieOverview film={film}/>;

      case `movieDetails`:
        return <MovieDetails film={film}/>;

      case `movieReviews`:
        return <MovieReviews film={film}/>;
    }
    return <p>Что-то пошло не так :(</p>;
  }

  render() {
    const {currentTab} = this.state;
    const {film} = this.props;
    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item${currentTab === `movieOverview` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`movieOverview`);
                }}
                className="movie-nav__link"
              >
                Overview
              </a>
            </li>
            <li className={`movie-nav__item${currentTab === `movieDetails` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`movieDetails`);
                }}
                className="movie-nav__link"
              >
                Details
              </a>
            </li>
            <li className={`movie-nav__item${currentTab === `movieReviews` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`movieReviews`);
                }}
                className="movie-nav__link"
              >
                Reviews
              </a>
            </li>
          </ul>
        </nav>
        {this._renderTab(currentTab, film)}
      </div>
    );
  }
}

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
  })
};

export default TabList;
