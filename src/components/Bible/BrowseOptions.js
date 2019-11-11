import React, { Component } from 'react';
import BookSelect from './BookSelect';
import ChapterSelect from './ChapterSelect';

export default class BrowseOptions extends Component {
  getSelectedChapters(books, selected) {
    if (!selected) {
      return null;
    }

    const selectedBook = books[selected];
    const chapters = selectedBook.chapters;

    return chapters;
  }

  render() {
    const { books, onSelect, onRequest, selected } = this.props;
    const chapters = this.getSelectedChapters(books, selected);

    return (
      <div className="browse-options">
        <BookSelect
          className="browse-book browse-option"
          books={books} onSelect={onSelect}
        />
        <ChapterSelect
          className="browse-chapter browse-option"
          chapters={chapters}
          selected={selected}
          onRequest={onRequest}
        />
      </div>
    );
  }
}
