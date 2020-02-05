import React from "React";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoFilm} = props;

  return <Main promoFilm={promoFilm} />;
};

export default App;
