import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Film} from "../../types";
import {MIN_TEXT_LENGTH} from '../../const';

interface Props {
  onActiveItemChange: (newActiveItem: number) => void;
  onTextChange: (text: string) => void;
  activeItem: number;
  text: string;
  reviewedFilm: Film;
  onReviewSend: (id: number, comment: string, rating: number) => void;
  isFormSending: boolean;
  formErrorMessage: string;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onActiveItemChange,
    activeItem: chosenStar,
    onTextChange,
    text,
    reviewedFilm,
    onReviewSend,
    isFormSending,
    formErrorMessage
  } = props;
  const {id, title, posterSrc, bgSrc} = reviewedFilm;
  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={bgSrc} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={`${AppRoute.ROOT}`} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={`${AppRoute.FILM}/${id}`}
                  className="breadcrumbs__link"
                >
                  {title}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <Link to={`${AppRoute.MY_LIST}`}>
              <div className="user-block__avatar">
                <img
                  src="/img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </Link>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterSrc} alt={title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onReviewSend(id, text, chosenStar);
          }}
          action="#"
          className="add-review__form"
        >
          <div className="rating">
            <div className="rating__stars">
              <input
                className="rating__input"
                checked={chosenStar === 1}
                onChange={() => {
                  onActiveItemChange(1);
                }}
                id="star-1"
                type="radio"
                name="rating"
                value="1"
                disabled={isFormSending}
              />
              <label className="rating__label" htmlFor="star-1">
                Rating 1
              </label>

              <input
                className="rating__input"
                checked={chosenStar === 2}
                onChange={() => {
                  onActiveItemChange(2);
                }}
                id="star-2"
                type="radio"
                name="rating"
                value="2"
                disabled={isFormSending}
              />
              <label className="rating__label" htmlFor="star-2">
                Rating 2
              </label>

              <input
                className="rating__input"
                checked={chosenStar === 3}
                onChange={() => {
                  onActiveItemChange(3);
                }}
                id="star-3"
                type="radio"
                name="rating"
                value="3"
                disabled={isFormSending}
              />
              <label className="rating__label" htmlFor="star-3">
                Rating 3
              </label>

              <input
                className="rating__input"
                checked={chosenStar === 4}
                onChange={() => {
                  onActiveItemChange(4);
                }}
                id="star-4"
                type="radio"
                name="rating"
                value="4"
                disabled={isFormSending}
              />
              <label className="rating__label" htmlFor="star-4">
                Rating 4
              </label>

              <input
                className="rating__input"
                checked={chosenStar === 5}
                onChange={() => {
                  onActiveItemChange(5);
                }}
                id="star-5"
                type="radio"
                name="rating"
                value="5"
                disabled={isFormSending}
              />
              <label className="rating__label" htmlFor="star-5">
                Rating 5
              </label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              onChange={(e) => onTextChange(e.target.value)}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Text must contain at least 50 symbols"
              disabled={isFormSending}
            ></textarea>
            <div className="add-review__submit">
              <button
                disabled={text.length < MIN_TEXT_LENGTH || isFormSending}
                className="add-review__btn"
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
        </form>
        {formErrorMessage ? (
          <p>
            Failed to send your review. :( <br />
            {`The reason: ${formErrorMessage}`}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default AddReview;
