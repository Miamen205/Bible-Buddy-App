import React, { Component } from 'react';
import { fetchChapter } from '../../api/biblenet.api.js';
// import books from '../../data/bible.books.info.obj.js';
// import BrowseOptions from './BrowseOptions';
// import BibleContent from './BibleContent';
import ColorPanel  from "../ColorPanel/ColorPanel";
import SecondSidePanel  from "../SidePanel/SecondSidepanel";
import "../App.css";
class Bible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      dataResult: null,
      loading: false
    };

    this.onSelect = this.onSelect.bind(this);
    this.onRequest  = this.onRequest.bind(this);
    this.mapVerses = this.mapVerses.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  onSelect(bookSelected) {
    if (!bookSelected) {
      return;
    }

    this.setState({
      selected: bookSelected
    });
  }

  mapVerses(versesData) {
    return Object.keys(versesData)
      .map((verseKey) => {
        return {
          number: verseKey,
          text: versesData[verseKey].verse
        };
      });
  }

  setResults(data) {
    this.setState({
      dataResult: data
    });
  }

  onRequest(bookName, chapterNumber) {
    this.setState({
      loading: true,
      dataResult: null
    });

    fetchChapter(bookName, chapterNumber)
      .then((data) => {
        this.setState({
          loading: false,
          dataResult: {
            verses: this.mapVerses(data.chapter),
            bookName: data.book_name,
            chapterNumber: data.chapter_nr
          }
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          dataResult: null
        });
      });
  }

  render() {
    const { selected, dataResult, loading } = this.state;
    const { onSelect,  onRequest } = this;

    return (
      <div>
      <React.Fragment>
          <ColorPanel  />
          <SecondSidePanel />
        <header id="bible-content">
        </header>
          <center>
          <h1 id="Bible-Title">Your Bible </h1>
          <iframe id="Bible" src="https://www.bible.com"></iframe>
          </center>
          {/* <BrowseOptions
            selected={selected}
            onSelect={onSelect}
            onRequest={onRequest}
            books={books}
            className="browse-options"
            id="bible-content"
          /> */}
       

        {/* <BibleContent 
          className="results content-in"
          dataResult={dataResult}
          loading={loading}
          id="bible-content"
        /> */}
      </React.Fragment>
      </div>
    );
  }
}

export default Bible;
