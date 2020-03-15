import React from 'react';
import PropTypes from 'prop-types';

const monthsArr = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const convertDate = (date) => {
  const dateObj = new Date(date);
  return `${monthsArr[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

const MovieReviews = ({filmComments}) => {
  const reviewSecondPart = [...filmComments];
  const reviewsFirstPart = reviewSecondPart.splice(0, Math.ceil(reviewSecondPart.length / 2));
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviewsFirstPart.map((review) => {
          return (
            <div key={review.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{convertDate(review.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })
        }
      </div>
      <div className="movie-card__reviews-col">
        {reviewSecondPart.map((review) => {
          return (
            <div key={review.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{convertDate(review.date)}</time>
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
  }),
  filmComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
  })),
};

export default MovieReviews;
