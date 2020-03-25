import * as React from "react";
import {connect} from "react-redux";
import {getFilmsToRender} from "../../reducer/data/selectors";
import {getFilmsToShowCount} from "../../reducer/appStatus/selectors";
import {ActionCreators} from "../../reducer/appStatus/appStatus";
import {Film} from "../../types";

interface Props {
  onMoreFilmsButtonClick: () => void,
  filmsToRender: Film[]
  filmsToShowCount: number
}

const ShowMoreFilms: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onMoreFilmsButtonClick,
    filmsToRender,
    filmsToShowCount
  } = props;
  return (
    <div
      style={
        filmsToShowCount > filmsToRender.length ? {display: `none`} : null
      }
      className="catalog__more"
    >
      <button
        onClick={onMoreFilmsButtonClick}
        className="catalog__button"
        type="button"
      >
        Show more
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filmsToRender: getFilmsToRender(state),
  filmsToShowCount: getFilmsToShowCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onMoreFilmsButtonClick: () => {
    dispatch(ActionCreators.showMoreFilms());
  }
});

export {ShowMoreFilms};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreFilms);
