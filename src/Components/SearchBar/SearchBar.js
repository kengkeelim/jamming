import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    // this.onKeyPress = this.onKeyPress.bind(this);

  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  }

  /*
  <div className="SearchBar">
    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
    <a onClick={this.handleSearch}>SEARCH</a>
  </div>
  ===
  <form className="SearchBar" onSubmit={this.handleSearch}>
    <input placeholder="Enter A Song, Album, or Artist"  onChange={this.handleTermChange} />
    <button type="submit">SEARCH</button>
  </form>
  */

  render() {
    return(
      <form className="SearchBar" onSubmit={this.handleSearch}>
        <input placeholder="Enter A Song, Album, or Artist"  onChange={this.handleTermChange} />
        <button type="submit">SEARCH</button>
      </form>
    );
  }
};

export default SearchBar;
