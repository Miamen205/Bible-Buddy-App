import React, { Component } from 'react';
import './headerStyle.css';
import BrowseCategory from './BrowseCategory';
import SearchBook from './SearchBook';
import Titel from './Titel';
import User from './User';
import Menu from './Menu';
import { Link} from "react-router-dom";
import { Icon } from 'semantic-ui-react';

class Header extends Component {
  render () {
    return (
      <header>
        <BrowseCategory></BrowseCategory>
       <h2 id="HookHomeLink"> <Link to="/"><Icon name="home">Home</Icon></Link></h2>
        <SearchBook></SearchBook>
        <Titel></Titel>
        <User></User>
        <Menu></Menu>
      </header>
    );
  }
}

export default Header;
