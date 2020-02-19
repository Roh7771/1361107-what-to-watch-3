import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {videoSrc} = this.props;
    const video = this._videoRef.current;

    video.src = videoSrc;

    video.ontimeupdate = () => this.setState({
      progress: video.currentTime
    });
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    return this.props.isPlaying ? video.play() : video.load();
  }

  render() {
    const {posterSrc, videoSrc} = this.props;
    return (
      <video ref={this._videoRef} muted poster={posterSrc} src={videoSrc} alt="" width="280" height="175" />
    );
  }
}

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;

