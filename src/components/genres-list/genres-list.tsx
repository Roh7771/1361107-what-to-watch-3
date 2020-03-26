import * as React from "react";
import {connect} from "react-redux";
import {getCurrentGenre} from "../../reducer/appStatus/selectors";
import {ActionCreators} from "../../reducer/appStatus/appStatus";
import {getGenreList} from "../../reducer/data/selectors";

interface Props {
  currentGenre: string;
  onGenreButtonClick: (genre: string) => void;
  genreList: string[];
}

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
  const {currentGenre, onGenreButtonClick, genreList} = props;
  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre, i) => {
        return (
          <li
            key={`${i}-${genre}`}
            className={`catalog__genres-item ${
              currentGenre === genre ? `catalog__genres-item--active` : ``
            }`}
          >
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(e) => {
                e.preventDefault();
                onGenreButtonClick(genre);
              }}
            >
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  genreList: getGenreList(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.resetFilmsCount());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
