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
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default VideoPlayer;

