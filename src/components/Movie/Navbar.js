import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Icon } from 'semantic-ui-react';
import "./Movie.css"
class Navbar extends React.Component {
  render() {

    return (
       <nav>
          <h3 id="home"><Link to="/"><Icon name="home">Home</Icon></Link></h3>
                <Search className="search-bar" />
             </nav> 
    )
  }
}

export default Navbar;


