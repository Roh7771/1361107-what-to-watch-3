import {reducer, ActionCreators, ActionTypes} from "./reducer.js";
import films from './mocks/films';
import settings from "./mocks/settings";

describe(`Reducer`, () => {
  it(`returns initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentGenre: `All genres`,
      filmsList: films,
      filmsToRender: films,
      promoFilm: settings.PROMO_FILM
    });
  });

  it(`sets currentGenre correctly`, () => {
    expect(reducer({currentGenre: `All genres`}, {type: ActionTypes.CHANGE_GENRE, payload: `Comedies`})).toEqual({
      currentGenre: `Comedies`,
    });
  });

  it(`sets the new films-to-render list correctly`, () => {
    expect(reducer({filmsToRender: films, filmsList: films, currentGenre: `Kids & Family`}, {type: ActionTypes.SET_NEW_FILMS_LIST})).toEqual({
      currentGenre: `Kids & Family`,
      filmsList: films,
      filmsToRender: [
        {
          title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Kids & Family`,
          releaseYear: 2018,
          imgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
          bgSrc: `https://i.pinimg.com/originals/63/75/7f/63757f9caffab66b1a9ca9d0c7cbe4f0.jpg`,
          posterSrc: `https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png/220px-Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png`,
          ratingScore: 7.8,
          ratingCount: 350,
          description: [
            `In an effort to thwart Grindelwald's plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though he's unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.`
          ],
          director: `David Yates`,
          starring: [`Eddie Redmayne`, `Johnny Depp`, `Ezra Miller`, `Carmen Ejogo`],
          videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          id: 2,
          filmDuration: 99,
          reviews: [
            {
              rating: 8.9,
              reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
              reviewer: `Kate Muir`,
              reviewDate: `2016-12-24`,
            },
            {
              rating: 8.9,
              reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
              reviewer: `Kate Muir`,
              reviewDate: `2016-12-24`,
            },
            {
              rating: 8.9,
              reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
              reviewer: `Kate Muir`,
              reviewDate: `2016-12-24`,
            },
            {
              rating: 8.9,
              reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
              reviewer: `Kate Muir`,
              reviewDate: `2016-12-24`,
            },
            {
              rating: 8.9,
              reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
              reviewer: `Kate Muir`,
              reviewDate: `2016-12-24`,
            }
          ]
        },
      ]
    });
  });
});

describe(`ActionCreators`, () => {
  it(`for genre changing returns correct action`, () => {
    expect(ActionCreators.changeGenre(`Comedies`)).toEqual({
      type: ActionTypes.CHANGE_GENRE,
      payload: `Comedies`,
    });
  });

  it(`for setting new films list returns correct action`, () => {
    expect(ActionCreators.setNewFilmsList()).toEqual(
        {
          type: ActionTypes.SET_NEW_FILMS_LIST,
        }
    );
  });
});
