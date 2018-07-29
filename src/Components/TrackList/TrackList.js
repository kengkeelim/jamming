import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        /*
        34) In the TrackList component, use the .map() method to render each
        track in the tracks property. Set the key attribute to track.id. This
        will require you to pass the current track as an attribute called track
        to the Track component.
        */
        {
          this.props.tracks.map(track => {
            return <Track
                    track={track}
                    key={track.id}
                    /*
                    44) Pass onAdd from the TrackList component to the Track
                    component.
                    */
                    //passed from App.js to add track to playlistTracks.
                    onAdd={this.props.onAdd}
                    /*
                    52) Pass onRemove and isRemoval from the TrackList
                    component to the Track component.
                    */
                    isRemoval={this.props.isRemoval}
                    //passed from App.js to remove track from playlistTracks.
                    onRemove={this.props.onRemove} />
          })
        }
      </div>
    );
  }
}

export default TrackList;
