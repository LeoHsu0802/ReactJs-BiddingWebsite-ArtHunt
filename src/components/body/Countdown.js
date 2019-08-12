import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Countdown.css'

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:this.props.id,
      endid:'',
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
    this.gameover=this.gameover.bind(this)
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
      //一秒後再判斷是否有過期商品，不然會抓到全部
      this.gameover()
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  //判斷時間是否結束，若結束 剩餘的時間的合會等於0，此時就要關閉出價功能
  gameover(){
  if(this.state.days+this.state.hours+this.state.min+this.state.sec==0){
      //判斷後將結束商品的ID放入endid
      this.setState({
        endid:this.props.id
      })
      //將結束商品的ID(endind)傳出到Parent(Body.js)後再傳到Child(Pricebidding.js)做關閉出價處理
      this.props.gameover(this.state.endid)
    }
    }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;

    }
    return value;
  }


  render() {
    const countDown = this.state;

    return (
      <div className="Countdown" >
        <span>還剩下  </span>

            <a>{this.addLeadingZeros(countDown.days)}</a>
            <span>{countDown.days === 1 ? 'Day' : '日'}</span>

            <a>{this.addLeadingZeros(countDown.hours)}</a>
            <span>時</span>

            <a>{this.addLeadingZeros(countDown.min)}</a>
            <span>分</span>

            <a>{this.addLeadingZeros(countDown.sec)}</a>
            <span>秒</span>
      </div>
    
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;