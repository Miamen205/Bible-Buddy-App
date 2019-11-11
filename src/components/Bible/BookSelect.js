import React, { Component } from 'react';
import Option from './Option';
import "../App.css";

export default class BookSelect extends Component {
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  changeOption(e) {
    const { onSelect } = this.props;
    const selectedBook = e.target.value;

    onSelect(selectedBook);
  }

  getOptions(books) {
    return Object.keys(books)
      .map((bookKey) => <Option key={bookKey} name={bookKey} />);
  }

  render() {
    const { className, books, selected } = this.props;
    const { changeOption, getOptions } = this;

    return (
      <div className={className}>
        <label id="Book-Lable">Book:</label>
        <select id="Book-select" onChange={changeOption} value={selected}>
          <option>Select...</option>
          { getOptions(books) }
        </select>
      </div>
    );
  }
}
