import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this.state = {isPlaying: this.props.isPlaying};
    }

    componentDidMount() {
      const {videoSrc} = this.props;
      const video = this._videoRef.current;

      video.src = videoSrc;
      video.muted = true;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      const {isPlaying} = this.props;

      if (isPlaying !== this.state.isPlaying) {
        this.setState({isPlaying}, () => {
          if (isPlaying) {
            video.play();
          } else {
            video.load();
          }
        });
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.onplay = null;
      video.src = ``;
      video.muted = false;
    }

    render() {
      const {posterSrc, videoSrc} = this.props;
      return (
        <Component {...this.props}>
          <video ref={this._videoRef} poster={posterSrc} src={videoSrc} alt="" width="280" height="175" />
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    videoSrc: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
  };

  return WithVideo;
};

export default withVideo;
