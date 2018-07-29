import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{

  /*
  70) In the SearchBar component, create a contstructor method with a call to
  super(props).
  Inside of the constructor, bind the current value of this to .search().
  72) In the SearchBar.js constructor method, bind the current value of this to
  this.handleTermChange.
  */
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }

  /*
  71) In SearchBar.js create a method called handleTermChange with the
  following functionality:
  - Accepts an event argument
  - Sets the state of the search bar's term to the event target's value.
  */
  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  /*
  69) In SearchBar.js, create a method called search that passes the state of
  the term to this.props.onSearch.
  */
  handleSearch(searchTerm) {
    this.props.onSearch(this.state.searchTerm);
  }

  /*
  73) In the search bar's <input> element, add an onChange attribute
  and set it equal to this.handleTermChange.
  */
  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
