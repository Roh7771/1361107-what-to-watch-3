import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Footer = (props) => {
  const logo = (
    <Fragment>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Fragment>
  );
  return (
    <footer className="page-footer">
      <div className="logo">
        {props.withLink ? (
          <Link
            to={`${AppRoute.ROOT}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="logo__link logo__link--light"
          >
            {logo}
          </Link>
        ) : (
          <a className="logo__link logo__link--light">{logo}</a>
        )}
      </div>
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  withLink: PropTypes.bool
};

export default Footer;
