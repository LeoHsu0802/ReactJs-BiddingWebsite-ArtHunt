import React, { Component } from 'react'
import './body.css'
import Countdown from './timecountdown'
import Pricebidding from './pricebidding';

class body extends Component {
//建立items來放資料，isLoaded判斷是否成功取到
  constructor(props) {
    super(props);
    this.state ={
      items:[],
      isLoaded: false,
    }
  }
  
  componentDidMount(){
//使用fetch抓取商品資料，放置在Server 3000
    fetch('http://localhost:3000/', {mode: 'cors'})
      .then(res => res.json())
      .then(json =>{
        this.setState({
            isLoaded: true,
            items: json,
        })
      });
  }
  
  bidhandler(price){
    console.log(price)
  }

  render() {
    //判斷式，若無取得資料則顯示Loading..若取得資料則返回
      var{isLoaded, items} =this.state;
      if(!isLoaded){
        return<div>Loading...</div>;
      }
      else{
        return (
          <article className='itemContainer'>
            {items.map(item =>(
              <div key={item.id} className='itemBox'>
                 <img className='itemImg' key={item.id} src ={item.img}></img>
                 <h3 >{item.name}</h3>
                 <Countdown date={item.endtime}/>
                 <Pricebidding price={item.price} id={item.id} bidhandler={this.bidhandler} />
              </div>  
            ))}
          </article>

        )
      }
  }
}

export default body
