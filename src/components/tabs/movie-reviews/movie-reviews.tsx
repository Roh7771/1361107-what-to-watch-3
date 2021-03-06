import * as React from "react";
import {Comment} from "../../../types";

const monthsArr: string[] = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return `${
    monthsArr[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

interface Props {
  filmComments: Comment[];
}

const MovieReviews: React.FunctionComponent<Props> = (props: Props) => {
  const {filmComments} = props;
  const secondCommentsList = [...filmComments];
  const firstCommentsList = secondCommentsList.splice(
      0,
      Math.ceil(secondCommentsList.length / 2)
  );
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {firstCommentsList.map((review) => {
          return (
            <div key={review.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>
                    {convertDate(review.date)}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })}
      </div>
      <div className="movie-card__reviews-col">
        {secondCommentsList.map((review) => {
          return (
            <div key={review.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>
                    {convertDate(review.date)}
                  </time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviews;
