import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import UserPanel from './UserPanel';
import Channels from './Channels'
import DirectMessages from './DirectMessages';
import Starred from './Starred';

class SidePanel extends React.Component {
  render() {
    const { currentUser,primaryColor } = this.props;

    return (
      <Menu className="page"
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: primaryColor, fontSize: '1.2rem' }}
      >
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
        <Menu.Item>
        <h4><Link className="Side-Link" to="/bible"><Icon name="book"></Icon>Your Bible</Link></h4>
        </Menu.Item>
        <Menu.Item>
        <h4><Link className="Side-Link" to="/movie"><Icon name="play"></Icon>Movie Time</Link></h4>
          </Menu.Item>
          <Menu.Item>
        <h4><Link className="Side-Link" to="/bookstore"><Icon name="book"></Icon>Books Store</Link></h4>
          </Menu.Item>
           <Menu.Item>
        <h4><Link className="Side-Link" to="/YouTube"><Icon name="youtube"></Icon> Video Search</Link></h4>
        </Menu.Item>
        <Menu.Item>
        <h4><Link className="Side-Link" to="/BibleGames"><Icon name="card"></Icon> Bible Games</Link></h4>
        </Menu.Item>
          {/* <Menu.Item>
        <h3><Link to="/videochat"><Icon name="group"></Icon>Buddy Video Chat</Link></h3>
          </Menu.Item> */}
      </Menu>
    )
  }
}

export default SidePanel;