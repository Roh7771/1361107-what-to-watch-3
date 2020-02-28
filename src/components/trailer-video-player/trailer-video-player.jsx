import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const TrailerVideoPlayer = ({children}) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

TrailerVideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default TrailerVideoPlayer;

