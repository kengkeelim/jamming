import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

/* 37) Add hard-coded values for playlistName and playlistTracks to state in
App.js. You can set playlistName to any string. The playlistTracks value should
be an array of objects, each containing name, artist, album, and id properties.

###

const playlistName = 'Love Songs';

const track = {
  name: 'Love You You',
  artist: 'JJ Lin',
  album: 'Yay',
  id: 'test'
}

const playlistTracks = [
  track,
  track,
  track,
];
*/

class App extends Component {
  constructor(props) {
    super(props);

    /*
    31) Inside of the App constructor, set this.state to an object with a
    property called searchResults set to an array of objects, each containing
    name, artist, album, and id properties.
    */

    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
    };

    /*
    42) Bind the current value of this to .addTrack().
    50) In the App constructor method, bind the current value of this to
    .removeTrack().
    58) In the App constructor method, bind this to .updatePlaylistName().
    64) Bind the current value of this to .savePlaylist().
    68) In the App constructor method, bind this to .search(). In a later
    assessment, we will use this in .search().
    */

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);

  }

  /*
  67) In App.js create a method called search with the following functionality:
  - Accepts a search term
  - Logs the term to the console
  88) In App.js, import Spotify and update the .search() method with
  the Spotify.search() method. Update the state of searchResults with
  the value resolved from Spotify.search()'s promise.
  */
  searchSpotify(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  /*
  63) In App.js create a method called savePlaylist with the following
  functionality:
  - Generates an array of uri values called trackURIs from the playlistTracks
  property.
  - In a later step, you will pass the trackURIs array and playlistName to a
  method that will save the user's playlist to their account.
  95) In App.js update the .savePlaylist() method to call
  Spotify.savePlaylist(). After you call Spotify.savePlaylist(), reset
  the state of playlistName to 'New Playlist' and playlistTracks
  to an empty array.
  */
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.saveplaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  /*
  57) In App.js create a method called updatePlaylistName with the following
  functionality:
  - Accepts a name argument
  - Sets the state of the playlist name to the input argument
  */
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  /*
  41) In App.js create a method called addTrack with the following
  functionality:
  - Accepts a track argument
  - Use the track's id property to check if the current song is in the
    playlistTracks state.
  - If the id is new, add the song to the end of the playlist.
  - Set the new state of the playlist
  */

  addTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    //This condition says that current song is in the playlistTracks state.
    //Q: Why using "savedTrack"? I'm confused with savePlaylist() above.
    if (newPlaylistTracks.find(savedTrack => savedTrack.id === track.id)) {
      //Thus, do nothing.
      return;
    }
    //Otherwise, push the track to the playlistTracks.
    newPlaylistTracks.push(track);
    //This update the playlistTracks state.
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  /*
  49) In App.js create a method called removeTrack with the following
  functionality:
  - Accepts a track argument
  - Uses the track's id property to filter it out of playlistTracks
  - Sets the new state of the playlist
  */
  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    //using indexOf to find get the index of the track from the playlistTracks.
    let trackIndex = newPlaylistTracks.indexOf(track);
    //Is it correct that index of the track we choose(click) will always be 0?
    if(trackIndex > -1) {
      newPlaylistTracks.splice(trackIndex, 1);
    };
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          /*
          68) Pass .search() to the SearchBar component as an onSearch
          attribute.
          */
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            /* 32) Pass this.state.searchResults to the SearchResults component
            as an attribute called searchResults.
            */
            <SearchResults
              searchResults={this.state.searchResults}
              /*
              42) Pass .addTrack() to the SearchResults component as an onAdd
              attribute.
              */
              onAdd={this.addTrack} />
            <Playlist
              /*
              38) Inside the App.js .render() method, pass
              this.state.playlistName and this.state.playlistTracks as
              attributes called playlistName and playlistTracks in the Playlist
              component.
              */
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              /*
              50) Pass .removeTrack() to the Playlist component as an onRemove
              attribute.
              */
              onRemove={this.removeTrack}
              /*
              58) Pass updatePlaylistName to the Playlist component as an
              attribute named onNameChange.
              */
              onNameChange={this.updatePlaylistName}
              /*
              64) Pass savePlaylist to the Playlist component as an attribute
              called onSave.
              */
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
