document.addEventListener("DOMContentLoaded", function() {
    const songs = [
        {title: "bts - i'm fine", file: "songs/bts - i'm fine.mp3", image: "cover_songs/bts-imfine.jpg"},
        {title: "bts - take two", file: "songs/bts - take two.mp3", image: "cover_songs/bts-take2.jpg"},
        {title: "le sserafim - different", file: "songs/lesserafim - different.mp3", image: "cover_songs/le-sserafim.jpg"},
        {title: "new jeans - super shy", file: "songs/new jeans - super shy.mp3", image: "cover_songs/new-jeans.jpg"},
        {title: "txt - blue hour", file: "songs/txt - blue hour.mp3", image: "cover_songs/txt-bluehour.jpg"},
    ];

    let currentSongIndex = 0;
    let audioPlayer = document.getElementById("audio-player");
    let audioSource = document.getElementById("audio-source");
    let songTitle = document.getElementById("song-title");
    let songImage = document.getElementById("song-image-img");
    let playPauseButton = document.getElementById("play-pause");
    let progressBar = document.getElementById("progress-bar");
    let valueDisplay = document.getElementById("value-display");

    //a function to update the player with the current song
    function updatePlayer() {
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.file;
        songImage.src = currentSong.image; 

        //reload the player with a new song
        audioPlayer.load();

        //reset the progress bar to 0 when the song changes
        progressBar.value = 0;
    }

    //event listener for the play pause button
    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.style.backgroundImage = 'url("assets/pause.png")';
        } else {
            audioPlayer.pause();
            playPauseButton.style.backgroundImage = "url('assets/play.png')";
        }
    });

    //event listener for previous song button
    document.getElementById("prev").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
        audioPlayer.play();
        //playPauseButton.style.backgroundImage = "url('assets/prev.png')";
    });

    //event listener for next song button
    document.getElementById("next").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
        audioPlayer.play();
        //playPauseButton.style.backgroundImage = "url('.../assets/next.png')";
    });
});

