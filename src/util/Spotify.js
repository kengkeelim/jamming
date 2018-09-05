let accessToken = '';

const redirectURI = 'http://jamming.kengkee.com/';
const cliendId = '3f80579fc4e7485f878808c5d78468fd';

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else {

      const url = window.location.href;
      const newToken = url.match(/access_token=([^&]*)/);
      const newExpire = url.match(/expires_in=([^&]*)/);

    if (newToken && newExpire) {
        accessToken = newToken[1];
        let expiresIn = Number(newExpire[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${cliendId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = spotifyAuthUrl;
      }
    }
  },

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
        return jsonResponse.tracks.items.map(track => (
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
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId='';

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => {
      return response.json()
    }).then(jsonResponse => {

      userId = jsonResponse.id;

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
  },
};

export default Spotify;
