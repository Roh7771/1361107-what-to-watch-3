import {extend} from "../../utils";

export default (data) => {
  const newData = data.map((film) => {
    const newFilm = extend(film, {
      title: film.name,
      descriptionList: [film.description],
      releaseYear: film.released,
      imgSrc: film.preview_image,
      bgSrc: film.background_image,
      posterSrc: film.poster_image,
      bgColor: film.background_color,
      ratingScore: film.rating,
      ratingCount: film.scores_count,
      videoSrc: film.video_link,
      filmDuration: film.run_time,
      isFavorite: film.is_favorite,
      trailerSrc: film.preview_video_link,
    });
    delete newFilm.name;
    delete newFilm.released;
    delete newFilm.preview_image;
    delete newFilm.background_image;
    delete newFilm.poster_image;
    delete newFilm.background_color;
    delete newFilm.rating;
    delete newFilm.scores_count;
    delete newFilm.video_link;
    delete newFilm.run_time;
    delete newFilm.is_favorite;
    delete newFilm.preview_video_link;
    delete newFilm.description;
    return newFilm;
  });
  return newData;
};
