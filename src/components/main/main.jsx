import React from "react";

const Main = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoFilm} = props;
  // eslint-disable-next-line react/prop-types
  const {title, releaseYear, genre} = promoFilm;

  return (
    <section className="welcome">
      <h1>{title}</h1>
      <div>
        <span>{genre}</span> - <span>{releaseYear}</span>
      </div>
    </section>
  );
};

export default Main;
