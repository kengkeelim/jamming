import React from 'react';
import './Track.css';

class Track extends React.Component {
  /*
  46) Add a constructor to the Track component. Call super(props) in the
  constructor method.
  Bind this.addTrack() to the current value of this in the constructor method.
  54) In Track.js, bind this.removeTrack() to the current value of this in the
  constructor method.
  */
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  /*
  45) Create an .addTrack() method in the Track component. Use it to add
  this.props.track to the playlist. Pass this.props.track to this.props.onAdd.
  */
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  /*
  53) Create a .removeTrack() method in the Track component. Use it to remove
  this.props.track from the playlist.
  */
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  /* 27.3) method called renderAction that displays a - anchor tag if the
  isRemoval property is true, and a + anchor tag if
  the isRemoval property is false.*/
  renderAction() {
    if (this.props.isRemoval) {
      /*
      55) In the Track.js - element, add an onClick property with the value set
      to the this.removeTrack method.
      */
      //passed from Playlist.js.
      return <a onClick={this.removeTrack}>-</a>
    } else {
      /*
      47) In the Track.js + element, add an onClick property with the value set
      to this.addTrack.
      */
      //passed from SearchResults.js.
      return <a onClick={this.addTrack}>+</a>
   }
 }

  render() {
    return(
      /*
      35) Use the following property calls to access the track's name, artist, and
      album:
      - this.props.track.name
      - this.props.track.artist
      - this.props.track.album
      //Spotify.js will pass the information here.
      */
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        //this allows user to + or - the song
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
