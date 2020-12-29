<h1 align="center">Music Player One</h2>

<div align="center" >
  <a href="https://music-player-1.herokuapp.com/">
  Live Site
  </a>
</div>
<br/>

<h3 align="center">
  Jump to time & skip song &nbsp; | &nbsp; Song search -> preview -> add
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/scrub-skip.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/search-flow.gif">
</p>
<br/>

<h3 align="center">
  &nbsp;Drag number to reorder playlist &nbsp; | &nbsp; Media control on lock screen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/drag-reorder-track.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/media-control.gif">
</p>
<br/>

<h3 align="center">
  Edit song information &nbsp; | &nbsp; Dark / Light mode toggle 
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/edit-song-info.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/darkmode-toggle.gif">
</p>
<br/>

<h3 align="center">
Desktop interface (responsive layout)
<h3>
<p align="center">
  <img width="600" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/desktop-adaptive.gif">
</p>
<br/>


## About

A mobile friendly music streaming web app hosted on S3. For a demo, please check out the [live site](https://music-player-1.herokuapp.com/).

## Features
+ Full playlist functionality
+ Uploading songs locally or from YouTube
  + A playlist is dynamically created from the search result allowing user to preview tracks before adding them
+ Edit song information (title, artist, album)
+ Automated album art fetching
  + Once the song title and artist info are filled in, the app will attempt to fetch the album art
+ Optimized UI for touch and mobile
  + Swipe touch gestures to reorder tracks and skip songs
  + Integrated media controls allows the user to controll playback from desktop keyboard or Bluetooth device
+ Dark/Light mode toggle

## Implementation

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
  - For YouTube uploads, a [Lambda](https://aws.amazon.com/lambda/) function is called with the YouTube url. The function utilizes a Node.js PassThrough stream to save the audio stream directly to S3.

### Album art
  - Once a the song titles and artist fields are filled in, the app will attempt to look for the song [MusicBrainz](https://musicbrainz.org/) database.
  - If a match is found, the app uses the returned id from the match and queries the [Cover Art Archive](http://coverartarchive.org/), which will return a link to the song's album art.
  - The user can specify custom album art by providing the an image url. This is useful on the few occasions when the app fetches the wrong album art, or when the album art is not available.

### Misc
  - Drag and drop of the playlist elements is implemented using [React DND](https://react-dnd.github.io/react-dnd/about) module.
  - The app uses the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to allow the user to control playback using hardware button, or button on the phone lockscreen / notification tray.

### Features to add
  + Batch addition and deletion of tracks to playlist
  + Batch editing of song metadata



