import React, { Component } from 'react';
import './sharedComponentsStyle.css';
import { MdStarHalf, MdStar} from 'react-icons/md'
import { Icon } from 'semantic-ui-react';

class Rate extends Component {
  render() {
    let fullStar = parseInt(this.props.rate, 10);
    let halfStar = 0;
    let emptyStar = 0;
    if ((parseFloat(this.props.rate) - fullStar) >= 0.3 && (parseFloat(this.props.rate) - fullStar) <= 0.8) {
      halfStar = 1;
    } else if ((parseFloat(this.props.rate) - fullStar) > 0.8) {
      fullStar += 1;
    }
    emptyStar = 5 - fullStar - halfStar;
    
    let stars = [];
    
    let index = 0;
    for (let i = 0; i < fullStar; i++, index++) {
      stars.push(<MdStar key={index}></MdStar>);
    }
    for (let i = 0; i < halfStar; i++, index++) {
      stars.push(<MdStarHalf key={index}></MdStarHalf>);
    }
    for (let i = 0; i < emptyStar; i++, index++) {
      stars.push(<Icon name="star" key={index}></Icon>);
    } 
    
    return (
      <div className='Rate' style={this.props.color}>
        {stars}
        <span style={{color: this.props.textColor}}>{this.props.voters} voters</span>
      </div>
    );
  }
}

export default Rate;