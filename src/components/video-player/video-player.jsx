import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({children}) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

VideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
};

export default VideoPlayer;

