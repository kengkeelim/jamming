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

  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSearch(searchTerm) {
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
};

export default SearchBar;
