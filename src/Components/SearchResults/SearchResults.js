import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component{
  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        /*
        33) Inside the SearchResults.js .render() method, pass
        this.props.searchResults as an attribute called tracks in the TrackList
        component.
         */
        // "+" clickable sign is at the SearchResults.js.
        /*
        43) Pass onAdd from the SearchResults component to the TrackList
        component. Pass isRemoval with a value of false down to TrackList.
        */
        <TrackList
        tracks={this.props.searchResults}
        isRemoval={false}
        onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
