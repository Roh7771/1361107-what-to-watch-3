import * as React from "react";
import history from "../../history";
import {VideoPlayerType} from "../../types";

const convertVideoTime = (time: number) => {
  let seconds: number | string;
  let minutes: number | string;
  let timeLeft: number;
  const hours = Math.floor(time / 60 / 60);

  timeLeft = time - hours * 60 * 60;

  minutes = Math.floor(timeLeft / 60);
  timeLeft = timeLeft - minutes * 60;

  seconds = timeLeft;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

interface Props {
  onFullScreenButtonClick: () => void;
  children: React.ReactNode;
  progressInPercent: number;
  progressInSeconds: number;
  isPlaying: boolean;
  title: string;
  isFullScreen: boolean;
  type: VideoPlayerType;
  onPlayButtonClick: () => void;
}

class MovieVideoPlayer extends React.PureComponent<Props, {}> {
  private _rootElRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);

    this._rootElRef = React.createRef();
    this._handlerFullScreenChange = this._handlerFullScreenChange.bind(this);
  }

  _handlerFullScreenChange() {
    this.props.onFullScreenButtonClick();
  }

  _renderPlayer() {
    const {
      children,
      progressInPercent,
      progressInSeconds,
      onPlayButtonClick,
      isPlaying,
      title,
      isFullScreen,
      type
    } = this.props;
    switch (type) {
      case VideoPlayerType.TRAILER:
        return <React.Fragment>{children}</React.Fragment>;

      case VideoPlayerType.MOVIE:
        return (
          <div ref={this._rootElRef} className="player">
            {children}

            <button
              type="button"
              onClick={() => {
                history.goBack();
              }}
              className="player__exit"
            >
              Exit
            </button>

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  <progress
                    className="player__progress"
                    value={`${progressInPercent}`}
                    max="100"
                  ></progress>
                  <div
                    className="player__toggler"
                    style={{left: `${progressInPercent}%`}}
                  >
                    Toggler
                  </div>
                </div>
                <div className="player__time-value">
                  {convertVideoTime(progressInSeconds)}
                </div>
              </div>

              <div className="player__controls-row">
                <button
                  onClick={onPlayButtonClick}
                  type="button"
                  className="player__play"
                >
                  {isPlaying ? (
                    <React.Fragment>
                      <svg viewBox="0 0 14 21" width="14" height="21">
                        <use xlinkHref="#pause"></use>
                      </svg>
                      <span>Pause</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </React.Fragment>
                  )}
                </button>

                <div className="player__name">{title}</div>

                <button
                  onClick={() => {
                    if (isFullScreen) {
                      document.exitFullscreen();
                    } else {
                      this._rootElRef.current.requestFullscreen();
                    }
                  }}
                  type="button"
                  className="player__full-screen"
                >
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
    return <p>Something went wrong :(</p>;
  }

  componentDidMount() {
    document.addEventListener(
        `fullscreenchange`,
        this._handlerFullScreenChange
    );
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this._handlerFullScreenChange);
  }

  render() {
    return this._renderPlayer();
  }
}

export default MovieVideoPlayer;
