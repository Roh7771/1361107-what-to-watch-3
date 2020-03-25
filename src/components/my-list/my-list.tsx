import * as React from "react";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import MovieList from "../movie-list/movie-list";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Film} from "../../types";

const MovieListWrapper = withActiveItem(MovieList);

interface Props {
  userFavoriteFilms: Film[]
  children: React.ReactNode
}

const MyList: React.FunctionComponent<Props> = (props: Props) => {
  const {userFavoriteFilms, children} = props;
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={`${AppRoute.ROOT}`} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img
              src="img/avatar.jpg"
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <MovieListWrapper activeItem={{}} filmsToRender={userFavoriteFilms} />
        </div>
      </section>

      {children}
    </div>
  );
};

export default MyList;
