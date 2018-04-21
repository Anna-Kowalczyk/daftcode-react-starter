import * as React from 'react';
import PropTypes from 'prop-types';

import './Counter.sass';

function dateStringFromSec(secs) {
  let isValid = (typeof secs === "number") && (secs >= 0);

  if (!isValid) {
    throw new Error("Invalid format")
  }

  let result = undefined;

  let minutes = Math.floor(secs/60);
  let seconds = Math.floor(secs % 60);

  let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  result = `${minutesStr} : ${secondsStr}`;

  return result;
}

class Counter extends React.Component {
  static propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    from: 20,
    to: 16
  }

  constructor(props) {
    super(props)

    this.state = {
      from: props.from,
      to: props.to
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount () {
      this.stopTimer();
  }

  tick () {
    if (this.state.from > this.state.to ) {
      this.setState({from: (this.state.from - 1)})
    } else {
      this.stopTimer();

      if (this.props.onSuccess) {
        this.props.onSuccess();
      }
    }
  }

  startTimer () {
    this.stopTimer();
    this.timer = setInterval(this.tick.bind(this),1000);
  }

  stopTimer () {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = undefined;
   }

   toggleTimer() {
     if (this.timer === undefined){
       this.startTimer()
     } else {
       this.stopTimer()
     }
   }

  render() {
    return (
      <div>
        <div
          className="counter"
          onClick={this.toggleTimer.bind(this)}
          style={{color: '#37c313'}}
        >
          {dateStringFromSec(this.state.from)}
        </div>
      </div>
    );
  }
}

export default Counter;
