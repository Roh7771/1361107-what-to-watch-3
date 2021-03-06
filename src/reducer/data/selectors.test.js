import {
  getAllFilms,
  getFilmsToRender,
  getPromoFilm,
  getUserFavoriteFilms,
  getFilmComments,
  getGenreList
} from "./selectors";

const mock = {
  userFavoriteFilms: [
    {
      title: `The Grand Budapest Hotel`,
      genre: `Comedies`,
      releaseYear: 2014,
      imgSrc: `img/the-grand-budapest-hotel.jpg`,
      bgSrc: `img/bg-the-grand-budapest-hotel.jpg`,
      posterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
      ratingScore: 8.9,
      ratingCount: 240,
      description: [
        `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
        `Gustave prides himself on providing first-classtitle service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
      ],
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

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
    },
    {
      title: `Aviator`,
      imgSrc: `img/aviator.jpg`,
      genre: `Dramas`,
      releaseYear: 2004,
      bgSrc: `data:image/jpeg;base64,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`,
      posterSrc: `https://m.media-amazon.com/images/M/MV5BZTYzMjA2M2EtYmY1OC00ZWMxLThlY2YtZGI3MTQzOWM4YjE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg`,
      ratingScore: 7.5,
      ratingCount: 362,
      description: [
        `Biopic of billionaire Howard Hughes, starting with his early filmmaking years as owner of R.K.O. Pictures, but mostly focusing on his role in designing and promoting new aircraft. Hughes was a risk-taker spending several fortunes on designing experimental aircraft and eventually founding TWA as a rival to Pan Am airlines owned by his great rival Juan Trippe. When Trippe's politico Senator Ralph Owen Brewster accuses Hughes of being a war profiteer, it's Hughes who gains the upper hand. Hughes also had many women in his life including a long relationship with Katharine Hepburn. From an early age, however, Hughes was also germophobic and would have severe bouts of mental illness.`
      ],
      director: `Martin Scorsese`,
      starring: [
        `Leonardo DiCaprio`,
        `Cate Blanchett`,
        `Kate Beckinsale`,
        `John C. Reilly`
      ],
      videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

      filmDuration: 99,
      reviews: [
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
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
  ],
  filmsList: [
    {
      title: `The Grand Budapest Hotel`,
      genre: `Comedies`,
      releaseYear: 2014,
      imgSrc: `img/the-grand-budapest-hotel.jpg`,
      bgSrc: `img/bg-the-grand-budapest-hotel.jpg`,
      posterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
      ratingScore: 8.9,
      ratingCount: 240,
      description: [
        `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
        `Gustave prides himself on providing first-classtitle service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
      ],
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

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
    },
    {
      title: `Aviator`,
      imgSrc: `img/aviator.jpg`,
      genre: `Dramas`,
      releaseYear: 2004,
      bgSrc: `data:image/jpeg;base64,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`,
      posterSrc: `https://m.media-amazon.com/images/M/MV5BZTYzMjA2M2EtYmY1OC00ZWMxLThlY2YtZGI3MTQzOWM4YjE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg`,
      ratingScore: 7.5,
      ratingCount: 362,
      description: [
        `Biopic of billionaire Howard Hughes, starting with his early filmmaking years as owner of R.K.O. Pictures, but mostly focusing on his role in designing and promoting new aircraft. Hughes was a risk-taker spending several fortunes on designing experimental aircraft and eventually founding TWA as a rival to Pan Am airlines owned by his great rival Juan Trippe. When Trippe's politico Senator Ralph Owen Brewster accuses Hughes of being a war profiteer, it's Hughes who gains the upper hand. Hughes also had many women in his life including a long relationship with Katharine Hepburn. From an early age, however, Hughes was also germophobic and would have severe bouts of mental illness.`
      ],
      director: `Martin Scorsese`,
      starring: [
        `Leonardo DiCaprio`,
        `Cate Blanchett`,
        `Kate Beckinsale`,
        `John C. Reilly`
      ],
      videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

      filmDuration: 99,
      reviews: [
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
          reviewText: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          reviewer: `Kate Muir`,
          reviewDate: `2016-12-24`
        },
        {
          rating: 8.9,
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
  ],
  filmComments: [
    {
      id: 1,
      user: {
        id: 1,
        name: `Some User`
      },
      rating: 9,
      comment: `Some comment`,
      date: `Sun Mar 15 2020`
    }
  ]
};

describe(`Selector`, () => {
  const {filmsList, userFavoriteFilms, filmComments} = mock;
  it(`getAllFilms must return all films`, () => {
    expect(getAllFilms({DATA: {filmsList}})).toEqual(filmsList);
  });

  it(`getPromoFilm must return promo film`, () => {
    expect(getPromoFilm({DATA: {promoFilm: {title: `promo`}}})).toEqual({
      title: `promo`
    });
  });

  it(`getUserFavoriteFilms must return user favorite films`, () => {
    expect(getUserFavoriteFilms({DATA: {userFavoriteFilms}})).toEqual(
        userFavoriteFilms
    );
  });

  it(`getFilmComments must return film comments`, () => {
    expect(getFilmComments({DATA: {filmComments}})).toEqual(filmComments);
  });

  it(`getFilmsToRender must return clipped films list`, () => {
    expect(
        getFilmsToRender({
          DATA: {filmsList},
          APP_STATUS: {filmsToShowCount: 1, currentGenre: `All genres`}
        })
    ).toEqual([
      {
        title: `The Grand Budapest Hotel`,
        genre: `Comedies`,
        releaseYear: 2014,
        imgSrc: `img/the-grand-budapest-hotel.jpg`,
        bgSrc: `img/bg-the-grand-budapest-hotel.jpg`,
        posterSrc: `img/the-grand-budapest-hotel-poster.jpg`,
        ratingScore: 8.9,
        ratingCount: 240,
        description: [
          `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
          `Gustave prides himself on providing first-classtitle service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
        ],
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        videoSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

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
      }
    ]);
  });

  it(`getGenreList must return film comments`, () => {
    expect(getGenreList({DATA: {filmsList}})).toEqual([
      `All genres`,
      `Comedies`,
      `Dramas`
    ]);
  });
});
