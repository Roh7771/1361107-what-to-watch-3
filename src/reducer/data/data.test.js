import {reducer, ActionCreators, ActionTypes, Operation} from "./data";
import settings from "../../mocks/settings";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";

const api = createAPI(() => {});

const films = [
  {
    [`is_favorite`]: false,
    [`background_color`]: `red`,
    [`name`]: `The Grand Budapest Hotel`,
    [`genre`]: `Comedies`,
    [`released`]: 2014,
    [`preview_image`]: `img/the-grand-budapest-hotel.jpg`,
    [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
    [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`,
    [`rating`]: 8.9,
    [`scores_count`]: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    [`video_link`]: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    id: 1,
    [`preview_video_link`]: `some link`,
    [`run_time`]: 99,
    reviews: [
      {
        rating: 8.5,
        reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        reviewer: `Kate Muir`,
        reviewDate: `2016-12-24`
      },
      {
        rating: 8.6,
        reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        reviewer: `Kate Muir`,
        reviewDate: `2016-12-24`
      },
      {
        rating: 8.7,
        reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        reviewer: `Kate Muir`,
        reviewDate: `2016-12-24`
      },
      {
        rating: 8.8,
        reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        reviewer: `Kate Muir`,
        reviewDate: `2016-12-24`
      },
      {
        rating: 8.9,
        reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        reviewer: `Kate Muir`,
        reviewDate: `2016-12-24`
      }
    ]
  }
];

describe(`Reducer`, () => {
  it(`returns initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      filmsList: [],
      promoFilm: settings.PROMO_FILM,
    });
  });

  it(`sets films`, () => {
    expect(reducer({filmsList: []}, {type: ActionTypes.LOAD_FILMS, payload: films})).toEqual({filmsList: films});
  });
});

describe(`ActionCreators`, () => {
  it(`for loading films returns correct action`, () => {
    expect(ActionCreators.loadFilms(films)).toEqual(
        {
          type: ActionTypes.LOAD_FILMS,
          payload: films
        }
    );
  });
});

describe(`Operation`, () => {
  it(`should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, films);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_FILMS,
          payload: [{
            title: `The Grand Budapest Hotel`,
            genre: `Comedies`,
            releaseYear: 2014,
            imgSrc: `img/the-grand-budapest-hotel.jpg`,
            bgSrc: `img/bg-the-grand-budapest-hotel.jpg`,
            posterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
            ratingScore: 8.9,
            ratingCount: 240,
            bgColor: `red`,
            trailerSrc: `some link`,
            isFavorite: false,
            description: [
              `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`
            ],
            director: `Wes Andreson`,
            starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
            videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
            id: 1,
            filmDuration: 99,
            reviews: [
              {
                rating: 8.5,
                reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
                reviewer: `Kate Muir`,
                reviewDate: `2016-12-24`
              },
              {
                rating: 8.6,
                reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
                reviewer: `Kate Muir`,
                reviewDate: `2016-12-24`
              },
              {
                rating: 8.7,
                reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
                reviewer: `Kate Muir`,
                reviewDate: `2016-12-24`
              },
              {
                rating: 8.8,
                reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
                reviewer: `Kate Muir`,
                reviewDate: `2016-12-24`
              },
              {
                rating: 8.9,
                reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
                reviewer: `Kate Muir`,
                reviewDate: `2016-12-24`
              }
            ]
          }],
        });
      });
  });
});
