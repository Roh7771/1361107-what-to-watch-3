import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this.state = {isPlaying: this.props.isPlaying};
  }

  componentDidMount() {
    const {videoSrc} = this.props;
    const video = this._videoRef.current;

    video.src = videoSrc;

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
      this.setState({
        isPlaying: false,
      });
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onplay = null;
    video.src = ``;
  }

  render() {
    const {posterSrc, videoSrc} = this.props;
    const {isPlaying} = this.state;
    return (
      <video className={isPlaying ? `play` : `pause`} ref={this._videoRef} muted poster={posterSrc} src={videoSrc} alt="" width="280" height="175" />
    );
  }
}

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;

