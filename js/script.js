let $ = document ;
const image = $.querySelector("#cover");
const title = $.getElementById("title");
const artist = $.getElementById("artist");
const music = $.querySelector("audio");
const currentTimeEl = $.getElementById("current-time");
const durationEl = $.getElementById("duration");
const progress = $.getElementById("progress");
const progressContainer = $.getElementById("progress-container");

const prevBtn = $.getElementById("prev");
const playBtn = $.getElementById("play");
const nextBtn = $.getElementById("next");

const background = $.getElementById("background");

// Music
const songs = [
  {
    path:"../assets/media/Living Life.mp3",
    displayName: "Living Life In The Night",
    artist: "sierra",
    cover:"../assets/image/Living Life.jpg",
  },
  {
    path: "../assets/media/Lite Over Flow.mp3",
    displayName: "Lite Over Flow",
    artist: "Mohammad",
    cover: "../assets/image/Lite over flow.png",
  } ,
  {
    path: "../assets/media/Darling.mp3",
    displayName: "Darling",
    artist: "Ali",
    cover: "../assets/image/Darling.jpg",
  } 
];


let isPlaying = false;


function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}


playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})



function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}


function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}


loadSong(songs[songIndex]);


function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }

    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}


function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}


prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
