import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";

let timer;

class MovieList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeCard: {}};
    this._handleMovieCardOut = this._handleMovieCardOut.bind(this);
    this._handleMovieCardOver = this._handleMovieCardOver.bind(this);
  }

  _handleMovieCardOver(card) {
    timer = setTimeout(() => {
      this.setState({
        activeCard: card,
      });
    }, 1000);
  }

  _handleMovieCardOut() {
    clearTimeout(timer);
    this.setState({
      activeCard: {},
    });
  }

  render() {
    const {filmsList, onMovieCardClick} = this.props;
    const {activeCard} = this.state;
    return (
      filmsList.map((el) => {
        return (
          <MovieCard
            key={el.id}
            film={el}
            onFilmMouseOut={this._handleMovieCardOut}
            onFilmMouseOver={this._handleMovieCardOver}
            onMovieCardClick={onMovieCardClick}
            activeCard={activeCard}
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
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MovieList;
