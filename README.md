<div style="text-align:center">
  <h1>Music Player One</h1>
  <a href="https://music-player-1.herokuapp.com/">
    <h2>
      Live Site
    </div>
  </a>

</div>
<p align="center">
  <img style="width:min(600px,100%)"  src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/desktop-adaptive.gif"></img>
</p>

<br/>


## About

A mobile friendly music streaming web app using S3 storage. For a demo, please check out the [live site](https://music-player-1.herokuapp.com/).

## Core features
+ Full playlist functionality
+ Adding songs
  + User can also search for songs using search bar
  + For each search, a playlist of the search results is dynamically generated, allowing the user to preview tracks before adding them
  + Upload local files, multi-file batch uploads are supported
+ Editable song metadata and automated album art fetching
  + Title, artist, album, and album art URL
  + Once the song title and artist fields are populated, the app will attempt to fetch the album art based on aforementioned info
+ Optimized UI for touch and mobile
  + Swipe touch gestures to reorder tracks and skip songs
  + Integrated media controls allows the user to controll playback from desktop keyboard or Bluetooth device
+ Dark/Light mode toggle

## Implementation Details

### Playlists
  - Backend ([Django](https://www.djangoproject.com/) | [Postgresql](https://www.postgresql.org/)):
    - Each occurence of a song in a playlist is stored as a row in the `Entry` table (join table between `Song` and `Playlist` tables) with the columns: `entry_id`, `playlist_id`, `song_id`, `order`.
    - The `order` column is an integer field representing the order of the track in the playlist, with `1` denoting the first track.
  - Frontend ([React](https://reactjs.org/) | [Redux](https://redux.js.org/)):
    - In Redux, a playlist is stored as an array of ordered pairs with the schema: `song_id`, `entry_id`.
    - The index of the array corresponds to the "`order` value minus 1" in the backend `Entry` table.  
  - To improve load time, playlists are fetched "lazily"
    - Only the **songs** and **playlist titles** are fetched when the user first logs in
    - Subsequently, each playlist is fetched separately only when the user requests it
  - Whenever a track is moved, added, or removed, the playlist's order column must be updated. Fortunately, Django's [F() expressions](https://docs.djangoproject.com/en/3.1/ref/models/expressions/#f-expressions) and [bulk_update()](https://docs.djangoproject.com/en/3.1/ref/models/querysets/#bulk-update) method allows for the batch update of rows in one or two SQL queries.
  - When a song is deleted in the database, all the (potentially many) playlists that contain the songs need to be updated in Redux. Along the lines of lazy playlist fetching, only two updated playlists are fetched from the database upon deletion -- the one that is currently playing, and the one that is being viewed. All other "dirty" playlists are wiped from the Redux store. These wiped playlists only fetched fresh again when the user requests it later on.


### Song upload
  - Songs are stored in AWS [S3](https://aws.amazon.com/s3/) buckets
  - Utilizing javascripts async methods, the user is able to upload multiple files at once
  - A Node.js [Lambda](https://aws.amazon.com/lambda/) function handles the song search, preview, and add functionality.

### Automated album art fetching
  - Once a the song titles and artist fields are filled in, the app will attempt to look for the song [MusicBrainz](https://musicbrainz.org/) database.
  - If a match is found, the app uses the returned id from the match and queries the [Cover Art Archive](http://coverartarchive.org/), which will return a link to the song's album art.
  - The user can specify custom album art by providing the an image url. This is useful on the few occasions when the app fetches the wrong album art, or when the album art is not available.

### Misc
  - Drag and drop of the playlist elements is implemented using [React DND](https://react-dnd.github.io/react-dnd/about) module.
  - The app uses the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to allow the user to control playback using hardware button, or button on the phone lockscreen / notification tray.

### Features to add
  + Batch addition and deletion of tracks to playlist
  + Batch editing of song metadata

<h2 align="center">Mobile UI Screenshots</h2>
<div class="double" style="width:min(600px, var(--card-width))">
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/scrub-skip.gif" />
    <figcaption> 
      Jump to time & skip song
    </figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/search-flow.gif" />
    <figcaption> Song search -> preview -> add </figcaption>
  </figure>
</div>

<div class="double" style="width:min(600px, var(--card-width))">
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/drag-reorder-track.gif" />
    <figcaption> 
      Drag number to reorder playlist
    </figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/media-control.gif" />
    <figcaption> Media control on lock screen </figcaption>
  </figure>
</div>



<div class="double" style="width:min(600px, var(--card-width))">
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/edit-song-info.gif" />
    <figcaption> 
      Edit song information
    </figcaption>
  </figure>
  <figure>
    <img src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/darkmode-toggle.gif" />
    <figcaption> Dark / Light mode toggle </figcaption>
  </figure>
</div>