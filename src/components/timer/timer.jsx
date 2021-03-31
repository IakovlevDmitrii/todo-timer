import React, { Component } from 'react';
import PropTypes from 'prop-types';

import play from './play.png';
import pause from './pause.png';

export default class Timer extends Component {
  state = {
    timeLeft: 0,
    isTimerStopped: true,
  };

  componentDidMount() {
    const { timeLeft } = this.props;

    if (timeLeft) {
      this.setState({
        timeLeft,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onPlay = (event) => {
    const { isTimerStopped } = this.state;
    const isTarget = event.target.tagName === 'IMG';

    if (isTarget && isTimerStopped) {
      this.timer = setInterval(this.reduceTimerLeft, 1000);

      this.setState({
        isTimerStopped: false,
      });
    }
  };

  reduceTimerLeft = () => {
    let { timeLeft } = this.state;

    if (timeLeft > 0) {
      timeLeft -= 1;

      this.setState({
        timeLeft,
      });
    } else {
      clearInterval(this.timer);
    }
  };

  onTimerPause = () => {
    const { onTimeLeftEdited } = this.props;
    const { timeLeft } = this.state;

    clearInterval(this.timer);

    this.setState({
      isTimerStopped: true,
    });

    onTimeLeftEdited(timeLeft);
  };

  render() {
    const { timeLeft } = this.state;

    let minutes = Math.floor(timeLeft / 60);
    if (minutes < 10) {
      minutes = `0${String(minutes)}`;
    }

    let seconds = timeLeft - minutes * 60;
    if (seconds < 10) {
      seconds = `0${String(seconds)}`;
    }

    const time = `${minutes}:${seconds}`;

    return (
      <span className="description">
        <button
          className="icon icon-play"
          onClick={(event) => {
            this.onPlay(event);
          }}
          type="button"
          aria-label="play"
        >
          <img src={play} alt="play" />
        </button>
        <button className="icon icon-pause" onClick={this.onTimerPause} type="button" aria-label="pause">
          <img src={pause} alt="pause" />
        </button>
        <span>{time}</span>
      </span>
    );
  }
}

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  onTimeLeftEdited: PropTypes.func.isRequired,
};
