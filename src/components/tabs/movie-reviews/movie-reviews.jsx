import React from 'react';
import PropTypes from 'prop-types';
import mockReviews from '../../../mocks/reviews';

const monthsArr = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const convertDate = (date) => {
  const dateArr = date.split(`-`);
  return `${monthsArr[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
};

const MovieReviews = ({film}) => {
  const {reviews = mockReviews} = film;
  const reviewSecondPart = [...reviews];
  const reviewsFirstPart = reviewSecondPart.splice(0, Math.ceil(reviewSecondPart.length / 2));
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviewsFirstPart.map((review, i) => {
          return (
            <div key={`${i}-${review.reviewer}`} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.reviewText}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.reviewer}</cite>
                  <time className="review__date" dateTime={review.reviewDate}>{convertDate(review.reviewDate)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })
        }
      </div>
      <div className="movie-card__reviews-col">
        {reviewSecondPart.map((review, i) => {
          return (
            <div key={`${i}-${review.reviewer}`} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.reviewText}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.reviewer}</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
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

export default MovieReviews;
