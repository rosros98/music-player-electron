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
    let progressBar = document.getElementById("progressBar");

    //a function to update the player with the current song
    function loadSong() {
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
            playPauseButton.style.backgroundImage = 'url("./assets/pause.png")';
        } else {
            audioPlayer.pause();
            playPauseButton.style.backgroundImage = 'url("./assets/play.png")';
        }
    });

    //event listener for previous song button
    document.getElementById("prev").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong();
        audioPlayer.play();
        playPauseButton.style.backgroundImage = 'url("./assets/pause.png")';
    });

    //event listener for next song button
    document.getElementById("next").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong();
        audioPlayer.play();
        playPauseButton.style.backgroundImage = 'url("./assets/pause.png")';
    });

    //event listener to control if the duration ! == NaN
    audioPlayer.addEventListener("loadedmetadata", () => {
        progressBar.value = 0;
    });

    //event listener to update progress bar as the song play
/*     audioPlayer.addEventListener("timeupdate", function() {
        if (!audioPlayer.duration) return;

        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;

        valueDisplay.textContent = `${Math.floor(progress * 100)}%`;
    }); */

    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;

        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;

        document.getElementById("progressBar").value = progress;
        document.getElementById("progressFill").style.width = progress + "%";
    });

    //event listener for progress bar input (seek)
    progressBar.addEventListener("input", function() {
        if (!audioPlayer.duration) return;

        const value = progressBar.value;
        const duration = audioPlayer.duration;

        audioPlayer.currentTime = (value / 100) * duration;
    });

    // event listener to go on the next song when one ends 
    audioPlayer.addEventListener("ended", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;

        loadSong(currentSongIndex);

        audioPlayer.play();
        playPauseButton.style.backgroundImage = 'url("./assets/pause.png")';
    });

    //event listener to close the app
    document.getElementById("close-btn").addEventListener("click", () => {
        window.api.closeApp();
    });
});

