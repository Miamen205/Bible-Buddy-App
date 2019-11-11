import React, { Component } from 'react';
import './VideoChat.css';
import VideoChat from './components/VideoChat';
import SpeechText from './components/VideoChatSpeechText/index';

class VideoChatRoute extends Component {
  render() {
    return (
      <div className="VideoChat">
        <header className="app-header">
          <h1>Video Chat with Bible Buddy</h1>
        </header>
        <main>
          <VideoChat />
          <SpeechText/>
        </main>
        <footer>
          <p>
            Made By{' '}
            <span role="img" aria-label="React">
              Bible Buddy
            </span>{' '}
          </p>
        </footer>
      </div>
    );
  }
}

export default VideoChatRoute;