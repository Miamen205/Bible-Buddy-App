
import React, { Component } from 'react';
import Header from './components/BookHeader/Header';
import Carousel from './components/BookCarousel/Carousel';
import Main from './components/BookMain/Main';
import './App.css';

class BookRoute extends Component {
  render() {
    return (
      <div className="BookRoute">
        <Header></Header>
        <Carousel></Carousel>
        <Main></Main>
      </div>
    );
  }
}

export default BookRoute;