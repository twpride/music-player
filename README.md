# Music Player One

A mobile friendly music streaming web app hosted on S3.

## Features
+ Full playlists functionality
+ Uploading songs locally or from YouTube
+ Edit song information (title, artist, album)
+ Watch live sound visualization as music plays
+ Automated album art fetching 
+ Optimized UI for touch and mobile

## Implementation

### Playlists
  - In order to minimize load times when a user has thousands of songs, playlist storage and playlist fetching needs to be implemented efficiently.
  - Backend implementation ([Django](https://www.djangoproject.com/)|[Postgresql](https://www.postgresql.org/)):
    - Each occurence of a song in a playlist is stored as a row in the Entry table (join table between Song and Playlist tables) with the columns: `entry_id`,`playlist_id`,`song_id`, `order`.
    - The `order` column is an integer field reprensenting order of the track in the playlist, with `1` being the first track.
  - Frontend implementation ([React](https://reactjs.org/)|[Redux](https://redux.js.org/)):
    - In Redux, a playlists is stored as an array of ordered pairs with the schema: `song_id`, `entry_id`. 
    - The index of the array corresponds to the `order` - 1 in the Postgres table.  
  - To improve initial load time, only the song and playlist titles are fetched when the user first logs in
  - Subsquently, each playlist is then fetched seperately when the user requests it
  - Whenever a track is moved, added, or removed in a playlist. The playlist's order column must be updated. Fortunately, Django's F() expressions and bulk_update(), allows for the batch update of rows in 1 or 2 queries.
  - When a track is deleted, all (potentially many) playlists that the song appears in needs to be updated. To prevent slowdown, only 2 updated playlists are fetched upon deletion -- the one that is currently playing, and the is being viewed. All other playlists are deemed "dirty" and is wiped from the Redux store. It is only fetched fresh when the user requests it later on. 

### Audio visualization
  - Audio data is processed by the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and rendered in realtime using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). 
  - The Web Audio API perfroms a Fast Fourier transform (FFT) to convert the audio to a frequency histogram.
  - The bin of the hisotgram are spaced out linearly
  - For a more intuitive presentaton (human percention of sound is logarithmic), the logarithmic coordinates of each bin is first saved and reused upon each render cycle.
  - To improve performance the rendering pipeline was written in vanilla JS, and connected with react using references. 

### Song upload
  - Songs are stored in AWS [S3](https://aws.amazon.com/s3/) buckets
  - Utilizing javascripts async methods, user is able to upload multiple files at once
  - For YouTube uploads, a [Lambda](https://aws.amazon.com/lambda/) function is called with the YouTube url. The fuction utilizes a Node.js PassThrough stream to save the audio stream directly to S3.

### Album art
  - Once a the song title are artist fields are filled in, the app will attempt to look the song [MusicBrainz](https://musicbrainz.org/) database.
  - If a match is found, the app uses the returned id from the match and querys the [Cover Art Archive](http://coverartarchive.org/) which will returns a link to song's associated album art.
  - The user can specify custom album art by providing url to image. The is useful on the rare ocassion that the app fetches the wrong album art, or when the album art is not available. 

### Misc 
  - Drag and drop of the playlist elements was implemented using [React DND](https://react-dnd.github.io/react-dnd/about) moduel.
  - The app uses the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to allow the user to control playback using hardware button, or button on the lockscreen / notification tray.

### Features to add
  + Batch addtion and deletion of tracks to playlist
  + Batch editing of song meta data

<br/>
<h2 align="center">App Screenshots</h2>
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
  &nbsp;Drag number to reorder playlist &nbsp; | &nbsp; Control playback on lockscreen&nbsp;
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