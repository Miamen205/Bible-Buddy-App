import React from "react";
import YoutubeLogo from "./images/Youtube-Logo.png";
import { Link} from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import "./Nav.css";

const Nav = props => {
  return (
    <div className="menu">
      <nav className="main-nav">
      <Link id="HomeNav" to="/"><Icon name="home">Home</Icon></Link>
        <a href="/">
          <img src={YoutubeLogo} alt="Youtube Logo" className="youtube-logo" />
        </a>
        {props.children}
      </nav>
    </div>
  );
};

export default Nav;