let accessToken = '';

/*
82) At the top of Spotify.js create constant variables for your
application's client ID and redirect URI.
Set the client ID variable to the value provided on your application page.
Set the redirect URI to "http://localhost:3000/".
*/
const redirectURI = 'http://localhost:3000/';
const cliendId = '3f80579fc4e7485f878808c5d78468fd';


const Spotify = {
  /*
  78) Inside the Spotify module, create a method called getAccessToken.
  Check if the user's access token is already set. If it is, return
  the value saved to access token.
  */
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    /*
    79) If the access token is not already set, check the URL to
    see if it has just been obtained. You will be using the Implicit
    Grant Flow to setup a user's account and make requests. The implicit
    grant flow returns a user's access token in the URL. Use
    window.location.href and the .match() method to retrieve the access
    token and expiration time from the URL.
    */

    //const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    //const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    /*
    80) If the access token and expiration time are in the URL, implement
    the following steps:
    - Set the access token value
    - Set a variable for expiration time
    - Set the access token to expire at the value for expiration time
    - Clear the parameters from the URL, so the app doesn't try grabbing
    the access token after it has expired
    */
    else {

      const url = window.location.href;
      const newToken = url.match(/access_token=([^&]*)/);
      const newExpire = url.match(/expires_in=([^&]*)/);

    if (newToken && newExpire) {
        accessToken = newToken[1];
        expiresIn = Number(newExpire[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      /*
      81) The third condition is that the access token variable is
      empty and is not in the URL.
      */
      //Get the related information (value) for authorization.
      else {
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${cliendId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = spotifyAuthUrl;
      }
    }
  }
  //end of getAccessToken

  /*
  85) In the Spotify object, add a method called search that accepts
  a parameter for the user's search term.
  .search() returns a promise that will eventually resolve to the list
  of tracks from the search.
  86) Inside .search(), start the promise chain by returning a GET request
  (using fetch()) to the following Spotify endpoint:
  - https://api.spotify.com/v1/search?type=track&q=TERM
  - Replace the value of TERM with the value saved to the search term argument.
  - Add an Authorization header to the request containing the access token.
  87) Convert the returned response to JSON.
  Then, map the converted JSON to an array of tracks. If the JSON does not
  contain any tracks, return an empty array.
  The mapped array should contain a list of track objects with the
  following properties:
  - ID — returned as track.id
  - Name — returned as track.name
  - Artist — returned as track.artists[0].name
  - Album — returned as track.album.name
  - URI — returned as track.uri
  */

  search(searchTerm) {
    const searchRequest = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const accessToken = this.getAccessToken();

    return fetch(searchRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => (
          {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          }
        ));
      } else {
        return [];
      }
    });
  }
  //end of search

  /*
  90) Create a method in Spotify.js that accepts two arguments.
  The first argument is the name of the playlist. The second is
  an array of track URIs. Inside the function, check if there are
  values saved to the method's two arguments. If not, return.
  */
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    /*
    91) Create three default variables:
    - An access token variable, set to the current user's access token
    - A headers variable, set to an object with an Authorization parameter
    containing the user's access token in the implicit grant flow request
    format
    - An empty variable for the user's ID
    */
    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId='';

    /*
    92) Make a request that returns the user's Spotify username. Convert
    the response to JSON and save the response id parameter to the
    user's ID variable.
    */
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => {
      return response.json()
    }).then(jsonResponse => {

      userId = jsonResponse.id;

      /*
      93) Use the returned user ID to make a POST request that creates
      a new playlist in the user's account and returns a playlist ID.
      Use the Spotify playlist endpoints to find a request that creates
      a new playlist.
      Set the playlist name to the value passed into the method.
      Convert the response to JSON and save the response id parameter
      to a variable called playlistID.
      */
      let playlistId = '';
      
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: playlistName})

        }).then(response => {
          return response.json();
        }).then(jsonResponse => {

          playlistId = jsonResponse.id;

          /*
          94) Use the returned user ID to make a POST request that
          creates a new playlist in the user's account and returns
          a playlist ID.
          Use the Spotify playlist endpoints to find a request
          that adds tracks to a playlist.
          Set the URIs parameter to an array of track URIs
          passed into the method.
          Convert the response to JSON and save the response id
          parameter to a variable called playlistID.
          */
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": 'apllication/json'
            },
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          });
        });
    });
    //end of postPlaylist

  };

/*
76) At the bottom of Spotify.js export Spotify.
*/
export default Spotify;
