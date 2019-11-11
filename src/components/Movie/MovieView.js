    
import React from 'react';
import ColorPanel  from "../ColorPanel/ColorPanel";
// import SecondSidePanel  from "../SidePanel/SecondSidepanel";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Movie.css"
import "./../../App.css"
import ListsOfMovies from "../../movieslist/ListsOfMovies";

const MovieView = ({ id, titulo, overview}) => {
  return (
      <div className="MovieView">
    <ColorPanel  />
    <Navbar />
    <br />
    <br />
    <div>
      <Header />
      <ListsOfMovies />
      <Footer />
    </div>
    </div>
  );
}

export default MovieView;