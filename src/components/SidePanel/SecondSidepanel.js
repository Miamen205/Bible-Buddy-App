import React from "react";
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import UserPanel from './UserPanel';
import Starred from './Starred';

class SecondSidePanel extends React.Component {
  render() {
    const { currentUser,primaryColor } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: primaryColor, fontSize: '1.2rem' }}
      >  <Menu.Item>
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        </Menu.Item>
        <Starred currentUser={currentUser} />
        <Menu.Item>
        <h1><Link to="/"><Icon name="home">Home</Icon></Link></h1>
          </Menu.Item>
      </Menu>
    )
  }
}

export default SecondSidePanel;