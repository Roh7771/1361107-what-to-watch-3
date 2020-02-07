let id = 1;

export const Settings = {
  PROMO_FILM: {
    promoFilmTitle: `The Grand Budapest Hotel`,
    promoFilmGenre: `Drama`,
    promoFilmReleaseYear: 2014
  },
  FILMS_LIST: [
    {
      filmTitle: `Fantastic Beasts`,
      filmId: id++
    },
    {
      filmTitle: `Bohemian Rhapsody`,
      filmId: id++
    },
    {
      filmTitle: `Macbeth`,
      filmId: id++
    }
  ]
};

