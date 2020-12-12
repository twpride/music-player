# music-player-1

# bugs 
 - songD as pl
 - off center title in card
 - titled bug when pl empty
 - tail delete
 - hit pause causes jump to active pl
 - we want songs to be draggable
 - make sure enter processes request

A mobile friend music streaming web app hosted on S3.

Key Features:
+ Playlists
  * Track reordering, track removal, song deletion
  * Instantaneous 
  * Instantaneous propogation of track reordering, track removal, song deletion 
+ Editable metadata
+ Uploading songs locally or from YouTube
  * Add songs from youtube by entering URL
  * Batched uploading supported
+ Audio waveform visualization 
  * Leverage Web Audio API to extract frequency data from audio
  * Plot real time frequency data using Canvas API
+ Automated album art fetching 
  * Once a valid Title and Artist is entered, the app automatically fetches the album art from the Cover Art Archive   
+ Gesture based UI
  * Swiping to skip track on touch enabled devices
  * Resonsive design
  * Integration with hardware media controls


Challenges:
- Playlist implementation
  - linked list implementation, using orm
- Song deletion
  + update only active playlists upon delete
- Audio waveform visualization
  - saving logarithmic coordinates
  - react doesnt know about canvas, 
- Adding songs
  - Parallel batched uploads to s3 using async await
  - lambda node function to directly stream youtube audio into S3 bucket 
- chunking ajax
  + split playlist from song title
  + process each pl individual upon first load
  + each change is progogated to store and db optimictly
- Fetchin album art
  - Communicate with MusicBrainz API to look up album id, 
  - traverse xml response to select best match
  - use album id to fetch album art from Cover Art Archive
- UX
  - Adapting single code base for mobile and desktop
  - use Album art to fill out extra space in desktop
  - add to homescreen

  - 
3rd party Technologies:
- Backend: 
  * [Django](https://www.djangoproject.com/)
  * [Postgresql](https://www.postgresql.org/)
  * [Heroku](https://www.heroku.com/)
  * AWS [S3](https://aws.amazon.com/s3/) and [Lambda](https://aws.amazon.com/lambda/) 
- Frontend: 
  * [React](https://reactjs.org/) with [Redux](https://redux.js.org/) (using hooks)
  * [Styled Components](https://styled-components.com/)
  * [React DND](https://react-dnd.github.io/react-dnd/about)
- Web APIs: 
  * [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
  * [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  * [Media Session](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- External APIs: 
  * [YouTube](https://www.npmjs.com/package/ytdl-core)
  * [Cover Art Archive](http://coverartarchive.org/)

