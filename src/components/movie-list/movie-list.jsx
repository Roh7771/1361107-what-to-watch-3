import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeCard: null};
    this._handleMovieCardOut = this._handleMovieCardOut.bind(this);
    this._handleMovieCardOver = this._handleMovieCardOver.bind(this);
  }

  _handleMovieCardOver(card) {
    this.setState({
      activeCard: card,
    });
  }

  _handleMovieCardOut() {
    this.setState({
      activeCard: null,
    });
  }

  render() {
    const {filmsList, onTitleButtonClick} = this.props;
    return (
      filmsList.map((el) => {
        return (
          <MovieCard
            key={el.id}
            film={el}
            onFilmMouseOut={this._handleMovieCardOut}
            onFilmMouseOver={this._handleMovieCardOver}
            onTitleButtonClick={onTitleButtonClick}
          />
        );
      })
    );
  }
}

MovieList.propTypes = {
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  })).isRequired,
  onTitleButtonClick: PropTypes.func.isRequired,
};

export default MovieList;
