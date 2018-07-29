import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  /*
  60) Add a constructor to the Playlist component. Call super(props) in the
  constructor method.
  Bind the current value of this to .handleNameChange().
  */
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /*
  59) In the Playlist component, create a method called handleNameChange.
  The method should accept an event that is triggered by an onChange attribute
  in the Playlist component's <input> element.
  Inside the method, call .onNameChange() with the event target's value
  (from the <input> element).
  */
  //onNameChange is passed from App.js, thus using this.props.
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input
        defaultValue={this.props.playlistName}
        /*
        61) In the Playlist render method, pass .handleNameChange() to an
        onChange property.
        */
        onChange={this.handleNameChange} />
        // "-" clickable sign is at the Playlist.js.
        /*
        39) Inside the Playlist.js .render() method, pass
        this.props.playlistTracks as an attribute called tracks in the
        TrackList component.
        */
        <TrackList
        tracks={this.props.playlistTracks}
        /*
        51) Pass onRemove from the Playlist component to the TrackList
        component. Pass isRemoval with a value of true down to TrackList.
        */
        onRemove={this.props.onRemove}
        isRemoval={true}/>
        <a className="Playlist-save"
        onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
