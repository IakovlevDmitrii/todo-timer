import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Since extends Component {
  static defaultProps = {
    updateInterval: 2000,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
    startTime: PropTypes.instanceOf(Date).isRequired,
  };

  state = {
    created: null,
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.timer = setInterval(() => this.countdown(), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculateInterval() {
    const { startTime } = this.props;
    return formatDistanceToNow(startTime, { includeSeconds: true });
  }

  countdown() {
    this.setState({
      created: this.calculateInterval(),
    });
  }

  render() {
    const { created } = this.state;
    return <span className="created">created {created}</span>;
  }
}
