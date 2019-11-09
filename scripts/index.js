/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        STATE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const songListElement = document.getElementById('songList');





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        RENDER FUNCTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

document.addEventListener('DOMContentLoaded', function () {


    function renderSongList(songsArray, element) {
        songListHTML = songsArray.map(function (track) {
            return `
            <div>
                <p>${track.trackName}</p>
                <button onclick="getLyrics('${track.trackId}')" data-trackId='${track.trackId}' data-artistId='${track.artistId}'>Get Lyrics</button>
            </div>
            `
        })
        element.innerHTML = songListHTML.join('');
    }



    //Form Submit Listener - search button for the songs
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('button is working');

        let searchString = document.getElementById('search-bar').value;
        console.log(searchString);


        //FUNCTION TO GET LIST OF SONGS USING SUBMITTED LYRICS
        axios.get('https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=' + searchString + '&apikey=a311818244ac163b84e06d86a8ec727f').then(function (response) {
            // console.log(response.data.message.body.track_list);
            const trackList = response.data.message.body.track_list
            console.log(trackList)
            // const artistTrackIds = trackList.map(trackObj => ({ artist_id: trackObj.track.artist_id, track_id: trackObj.track.track_id }))
            // console.log(artistTrackIds)
            // idArray = artistTrackIds
            const trackNamesWithIds = trackList.map(trackObj => ({ trackName: trackObj.track.track_name, artistId: trackObj.track.artist_id, trackId: trackObj.track.track_id }))
            console.log(trackNamesWithIds)
            renderSongList(trackNamesWithIds, songListElement);
        })

    });
});

const getLyrics = (trackId) => {
    console.log(trackId)
    axios.get('https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + trackId + '&apikey=a311818244ac163b84e06d86a8ec727f').then(function (response) {
        console.log(response);
    });
};