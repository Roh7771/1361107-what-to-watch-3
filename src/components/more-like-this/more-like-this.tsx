import * as React from "react";
import MovieList from "../movie-list/movie-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getAllFilms} from "../../reducer/data/selectors";
import {connect} from "react-redux";
import { Film } from "../../types";

const MovieListWrapper = withActiveItem(MovieList);

interface Props {
  filmsList: Film[]
  film: Film
  changeTab: () => void
}

const MoreLikeThis: React.FunctionComponent<Props> = (props: Props) => {
  const {filmsList, film: chosenFilm, changeTab} = props;
  const filmsToRender = filmsList
    .filter(
        (film) => chosenFilm.genre === film.genre && film.title !== chosenFilm.title
    )
    .slice(0, 4);
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {filmsToRender.length === 0 ? (
            <p>Sorry, there is no more films :(</p>
          ) : (
            <MovieListWrapper
              activeItem={{}}
              changeTab={changeTab}
              filmsToRender={filmsToRender}
            />
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filmsList: getAllFilms(state)
});

export {MoreLikeThis};

export default connect(mapStateToProps)(MoreLikeThis);
