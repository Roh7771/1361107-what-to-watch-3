import React from "react";
import PropTypes from 'prop-types';
import MovieCard from "../movie-card/movie-card.jsx";
import {connect} from "react-redux";

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
    const {filmsList, onMovieCardClick, filmsToShowCount} = this.props;
    const {activeCard} = this.state;
    const filmsToRender = filmsList.slice(0, filmsToShowCount);
    return (
      filmsToRender.length === 0 ?
        <p>There is no films :(</p> :
        filmsToRender.map((el) => {
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

const mapStateToProps = (state) => ({
  filmsList: state.filmsToRender,
  filmsToShowCount: state.filmsToShowCount
});

MovieList.propTypes = {
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    id: PropTypes.id,
  })).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  filmsToShowCount: PropTypes.number.isRequired,
};

export {MovieList};

export default connect(mapStateToProps)(MovieList);

