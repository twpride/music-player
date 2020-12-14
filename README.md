<h1 align="center">Music Player One</h2>

<div align="center" >
  <a href="https://music-player-1.herokuapp.com/">
  Live Site
  </a>
</div>
<br/>

<h3 align="center">
  &nbsp;&nbsp;&nbsp;&nbsp;Jump to time & skip song &nbsp; | &nbsp; Portrait & landscape switch
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/mobile-scrub-skip.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/landscape.gif">
</p>
<br/>

<h3 align="center">
  &nbsp;Drag number to reorder playlist &nbsp; | &nbsp; Media control on lock screen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/drag-reorder.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/mobile-media-control.gif">
</p>
<br/>

<h3 align="center">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit song information &nbsp; | &nbsp; Upload directly from YouTube
</h3>
<p align="center">
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/edit-song.gif">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="270" height="auto" src="https://raw.githubusercontent.com/twpride/music-player-1/main/assets/demo/upload.gif">
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
+ Edit song information (title, artist, album)
+ Watch live sound visualization as music plays
+ Automated album art fetching
+ Optimized UI for touch and mobile

## Implementation

### Playlists
  - Backend ([Django](https://www.djangoproject.com/) | [Postgresql](https://www.postgresql.org/)):
    - Each occurence of a song in a playlist is stored as a row in the `Entry` table (join table between `Song` and `Playlist` tables) with the columns: `entry_id`, `playlist_id`, `song_id`, `order`.
    - The `order` column is an integer field representing order of the track in the playlist, with `1` denoting the first track.
  - Frontend ([React](https://reactjs.org/) | [Redux](https://redux.js.org/)):
    - In Redux, a playlist is stored as an array of ordered pairs with the schema: `song_id`, `entry_id`.
    - The index of the array corresponds to the "`order` value minus 1" in the backend `Entry` table.  
  - To improve load time, playlists are fetched "lazily"
    - Only the **songs** and **playlist titles** are fetched when the user first logs in
    - Subsequently, each playlist is fetched separately only when the user requests it
  - Whenever a track is moved, added, or removed in a playlist. The playlist's order column must be updated. Fortunately, Django's [F() expressions](https://docs.djangoproject.com/en/3.1/ref/models/expressions/#f-expressions) and [bulk_update()](https://docs.djangoproject.com/en/3.1/ref/models/querysets/#bulk-update) method allows for the batch update of rows in 1 or 2 SQL queries.
  - When a song is deleted in the database, all the (potentially many) playlists that contain the songs need to be updated in Redux. Along the lines of lazy playlist fetching, only 2 updated playlists are fetched from the database upon deletion -- the one that is currently playing, and the is being viewed. All other "dirty" playlists and are wiped from the Redux store. It is only fetched fresh when the user requests it later on.

### Audio visualization
  - Audio data is processed by the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and rendered in real time using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
  - The Web Audio API performs a Fast Fourier transform (FFT) to convert the audio to a frequency histogram.
  - The bins of the histogram are spaced out linearly. For a more intuitive presentation (human perception of sound is logarithmic), the logarithmic coordinates of each bin is first saved and reused upon each render cycle.
  - To improve performance, the [rendering script](https://github.com/twpride/music-player-1/blob/main/frontend/components/audio_visualizer.js) is written in vanilla JS, and connects to React using references.

### Song upload
  - Songs are stored in AWS [S3](https://aws.amazon.com/s3/) buckets
  - Utilizing javascripts async methods, user is able to upload multiple files at once
  - For YouTube uploads, a [Lambda](https://aws.amazon.com/lambda/) function is called with the YouTube url. The function utilizes a Node.js PassThrough stream to save the audio stream directly to S3.

### Album art
  - Once a the song titles are artist fields are filled in, the app will attempt to look the song [MusicBrainz](https://musicbrainz.org/) database.
  - If a match is found, the app uses the returned id from the match and queries the [Cover Art Archive](http://coverartarchive.org/) which will return a link to the song's associated album art.
  - The user can specify custom album art by providing the image url. This is useful on the few occasions when the app fetches the wrong album art, or when the album art is not available.

### Misc
  - Drag and drop of the playlist elements was implemented using [React DND](https://react-dnd.github.io/react-dnd/about) module.
  - The app uses the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to allow the user to control playback using hardware button, or button on the lockscreen / notification tray.

### Features to add
  + Batch addition and deletion of tracks to playlist
  + Batch editing of song metadata



