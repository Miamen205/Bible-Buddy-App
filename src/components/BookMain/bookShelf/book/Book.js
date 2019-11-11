import React, { Component } from 'react';
import './bookStyle.css';
import BookCover from './BookCover';
import BookInfo from './BookInfo';
import Likes from './Likes';
import { FaHeart} from 'react-icons/fa';

class Book extends Component{
  constructor(props) {
		super(props);
		this.state = {
			liked: false,
		};
	}
  
  isLiked = () => {
		this.setState({liked: !this.state.liked});
	}

  render() {
    let like = null;
    if (this.state.liked) {
      like = <FaHeart className='icon' onClick={()=>{this.isLiked()}}></FaHeart>
    } else {
      like = <FaHeart className='icon' onClick={()=>{this.isLiked()}}></FaHeart>
    }
    return (
      <div className='Book'>
        <BookCover img={this.props.img}></BookCover>
        <BookInfo name={this.props.name} author={this.props.author}
        rate={this.props.rate} voters={this.props.voters}></BookInfo>
        {like}
        <Likes people={this.props.people}></Likes>
      </div>
    );
  }
}

export default Book;