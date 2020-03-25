export interface Film {
  title: string;
  genre: string;
  releaseYear: number;
  imgSrc: string;
  bgSrc: string;
  posterSrc: string;
  ratingScore: number;
  ratingCount: number;
  description: string[];
  director: string;
  starring: string[];
  id: number;
  filmDuration: number;
  videoSrc: string;
  isFavorite: boolean;
  trailerSrc: string;
  bgColor: string;
}

export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}
