import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import InListTab from "../tabs/in-list-tab/in-list-tab.jsx";
import DetailsTab from "../tabs/details-tab/details-tab.jsx";
import ReviewsTab from "../tabs/reviews-tab/reviews-tab.jsx";

class TabList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: `inList`,
    };
  }

  _handleTabClick(clickedTab) {
    this.setState({currentTab: clickedTab});
  }

  _renderTab(currentTab, film) {
    switch (currentTab) {
      case `inList`:
        return <InListTab film={film}/>;

      case `details`:
        return <DetailsTab film={film}/>;

      case `reviews`:
        return <ReviewsTab film={film}/>;
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
            <li className={`movie-nav__item${currentTab === `inList` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`inList`);
                }}
                className="movie-nav__link"
              >
                Overview
              </a>
            </li>
            <li className={`movie-nav__item${currentTab === `details` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`details`);
                }}
                className="movie-nav__link"
              >
                Details
              </a>
            </li>
            <li className={`movie-nav__item${currentTab === `reviews` ? ` movie-nav__item--active` : ``}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this._handleTabClick(`reviews`);
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
