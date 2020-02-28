import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this.state = {
        isPlaying: this.props.isPlaying,
        isFullScreen: false,
      };

      this._handlerPlayButtonClick = this._handlerPlayButtonClick.bind(this);
      this._handlerFullScreenButtonClick = this._handlerFullScreenButtonClick.bind(this);
    }

    _handlerPlayButtonClick() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying
      }));
    }

    _handlerFullScreenButtonClick() {
      this.setState((prevState) => ({
        isFullScreen: !prevState.isFullScreen
      }), () => {
        if (this.state.isFullScreen) {
          this._videoRef.requestFullscreen();
          return;
        }
        if (!this.state.isFullScreen) {
          this._videoRef.exitFullscreen();
          return;
        }
      });
    }

    componentDidMount() {
      const {videoSrc, isMuted = false} = this.props;
      const video = this._videoRef.current;

      video.src = videoSrc;
      video.muted = isMuted;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false
        });
      };

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.currentTime),
      });
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
      video.onpause = null;
      video.ontimeupdate = null;
    }

    render() {
      const {posterSrc, videoSrc, widthAtr = null, heightAtr = null, className = ``} = this.props;
      return (
        <Component
          {...this.props}
          onFullScreenButtonClick={this._handlerFullScreenButtonClick}
          onPlayButtonClick={this._handlerPlayButtonClick}
        >
          <video className={className} ref={this._videoRef} poster={posterSrc} src={videoSrc} alt="" width={widthAtr} height={heightAtr} />
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    videoSrc: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    isMuted: PropTypes.bool,
    heightAtr: PropTypes.number,
    widthAtr: PropTypes.number,
    className: PropTypes.string
  };

  return WithVideo;
};

export default withVideo;
