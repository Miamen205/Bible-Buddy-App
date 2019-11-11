import React, { Component } from 'react';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
// Components
import SearchBar from './components/YouTubeSearchBar/search_bar';
import VideoList from './components/YouTubeVideoList/video_list';
import VideoDetail from './components/YouTubeVideoDetail/video_detail';
import Nav from './components/YouTubeNav/Nav';
import './YouTube.css';
// Personal Key, it would be hidden for you. Get One!
import API_KEY from './api/key';

class YouTube extends Component {
  state = {
    videos: [],
    selectedVideo: null
  };

  componentDidMount() {
    this.searchVideoHandler('Guns and roses'); // for default will be guns and roses :>
  }

  searchVideoHandler = term => YTSearch({key: API_KEY, term}, videos => this.setState({videos, selectedVideo: videos[0]}));

  render() {
    return (
      <div className="YouTube">
        <Nav> 
          <SearchBar onSearchVideos={ _.debounce(this.searchVideoHandler, 433) } />
        </Nav>
       
        <VideoDetail videos={this.state.selectedVideo} > 
          <VideoList 
            videos={this.state.videos} 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
          /> 
        </VideoDetail>
      </div>
    );
  }
}

export default YouTube;