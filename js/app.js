const audio = document.querySelector(".music-player");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const musicCover = document.querySelectorAll(".music-image");
const musicBoxTitle = document.querySelector(".music-info");
const musicArtist = document.querySelector(".music-artist");
const musicTitle = document.querySelector(".music-title");
const volumeRange = document.querySelector(".volume-range");
const progressRange = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".current-time");
const musicContainer = document.querySelector(".music-boxes");
const duration = document.querySelector(".duration");
const volumeBtn = document.querySelector(".volume-button");
const playList = document.querySelector(".playlist-boxes");

const musics = [
  {
    id: 1,
    title: "band naf",
    artist: "Yas",
    music: "musics/yas-band-e-naf.mp3",
    cover: "images/yas.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Nookie",
    artist: "Limp Bizkit",
    music: "musics/03 - Nookie.mp3",
    cover: "images/nookie.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 3,
    title: "Animals",
    artist: "Nickelback",
    music: "musics/04 - Animals.mp3",
    cover: "images/Animals.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Sun Is Up",
    artist: "Inna",
    music: "musics/05-Sun Is Up.mp3",
    cover: "images/Sun Is Up.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Be Khod Ay",
    artist: "Aidin Joodi",
    music: "musics/105 - Be Khod Ay - Aidin Joodi.mp3",
    cover: "images/Aidin Joodi.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 6,
    title: "Bloody Mary",
    artist: "Lady Gaga",
    music: "musics/Lady Gaga Bloody Mary.mp3",
    cover: "images/Lady Gaga.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 7,
    title: "I Just Died In Your Arms",
    artist: "Cutting Crew",
    music: "musics/Cutting_Crew_I_Just_Died_In_Your.mp3",
    cover: "images/Cutting Crew.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
  {
    id: 8,
    title: "shadow lady",
    artist: "Portwave",
    music: "musics/Portwave - Shadow Lady.mp3",
    cover: "images/Shadow Lady.jpg",
    currentPlayTime: 0,
    duration: 1,
    isBookmarked: false,
  },
];

let localPlayList = JSON.parse(localStorage.getItem("localPlayList"));
// check if localPlayList is empty
if (!localPlayList) {
  localPlayList = [];
}
let currentSong;
const playListMusics = [];
let currentSongIndex;
let localSongValue = JSON.parse(localStorage.getItem("currentSong"));
// check if currentSong is empty
if (localSongValue) {
  currentSongIndex = localSongValue.id - 1;
} else {
  currentSongIndex = 0;
  localSongValue = musics[0];
}
let isFirstPlay = true;
let musicBoxIndex = 1;

// IIFE to add event listener to all music boxes
function showMusics() {
  musicContainer.innerHTML = "";
  musics.forEach((musicBox, index) => {
    currentSongIndex = index;
    updateMusicInfo();
  });
  const musicBoxBtns = document.querySelectorAll(".music-boxes .music__button");
  musicBoxBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const musicBoxId = e.target.parentElement.parentElement.parentElement.dataset.id;
      playSongByIconBox(btn, index);
      setTimeout(setDuration, 100);
      updateMusicInfoToFooter(musicBoxId - 1);
      setCurrentSongLocal();
    });
  });
  setInterval(setCurrentTime, 1000);
  currentSongIndex = 0;
}

function updateMusicInfo() {
  musicTitle.innerHTML = `${musics[currentSongIndex].artist} - ${musics[currentSongIndex].title}`;
  // Insert music box to the container in Dom
  musicContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="music-box music-box-${currentSongIndex + 1}" data-id="${musicBoxIndex}">
    <div class="music__banner">
        <img src="${musics[currentSongIndex].cover}"  alt="music_image" class="music-image">
        <div class="music__button-wrapper">
            <button class="music__button ">
                <i class="fas fa-play"></i>
            </button>
        </div>
    </div>
    <div class="music-info">${musics[currentSongIndex].artist} - ${musics[currentSongIndex].title}</div>
    <button class="music__bookmark btn" onclick="bookmarkMusic(event)">
        <i class="fa-regular fa-bookmark"></i>
    </button>
  </div>`,
  );
  musicBoxIndex++;
}

// Function to play song by clicking on music box icon
function playSongByIconBox(playBtn, index) {
  let pauseIcon = document.querySelector(".fa-pause");
  if (playBtn.children[0].classList.contains("fa-pause")) {
    pauseSong(playBtn);
    musics[localSongValue.id - 1].currentPlayTime = audio.currentTime;
  } else {
    if (pauseIcon) {
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
    currentSongIndex = index;

    audio.src = musics[currentSongIndex].music;
    audio.currentTime = musics[currentSongIndex].currentPlayTime;
    playSong(playBtn);

    audio.duration = musics[currentSongIndex].duration;
  }
  setCurrentSongLocal();
}

// Function to find play box button by current song index
function findPlayBoxBtn(currentIndex) {
  let songIndex2;
  musics.forEach((music, index) => {
    if (music.id === currentIndex) {
      songIndex2 = index;
    }
  });
  let playBoxBtn = musicContainer.querySelector(`.music-box-${songIndex2 + 1} .music__button`);
  return playBoxBtn;
}

function findPlayListBtn() {
  let songIndex = playListMusics.findIndex((music) => music.id === currentSongIndex + 1);
  let playListBtn = document.querySelector(`.music-box-${songIndex + 1}.music__playlist-button`);
  return playListBtn;
}

// Function to change box icon to pause when playing
function changeBoxIcon(currentSongIndex2) {
  let playBoxBtn;
  playBoxBtn = findPlayBoxBtn(currentSongIndex2);

  let pauseIcon = document.querySelector(".fa-pause");
  if (pauseIcon) {
    pauseIcon.classList.remove("fa-pause");
    pauseIcon.classList.add("fa-play");
  }

  playBoxBtn.children[0].classList.remove("fa-play");
  playBoxBtn.children[0].classList.add("fa-pause");
}

function playSong(playBoxBtn) {
  const playBtn = document.querySelector("#play");
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playBoxBtn.innerHTML = "<i class='fas fa-pause'></i>";
}

function pauseSong(playBoxBtn) {
  const playBtn = document.querySelector("#play");
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBoxBtn.innerHTML = "<i class='fas fa-play'></i>";
}

// Function to play current song
function playSongByPlayIcon() {
  currentSongIndex = localSongValue.id - 1;
  setTimeout(setDuration, 100);
  // Check if it's the first time play
  if (isFirstPlay && !JSON.parse(localStorage.getItem("currentSong"))) {
    audio.src = musics[currentSongIndex].music;
    isFirstPlay = false;
    localSongValue.id = 1;
    updateMusicInfoToFooter(localSongValue.id - 1);
  }
  const playBoxBtn = findPlayBoxBtn(localSongValue.id);
  if (playBoxBtn.children[0].classList.contains("fa-pause")) {
    pauseSong(playBoxBtn);
    musics[currentSongIndex].currentPlayTime = audio.currentTime;
  } else {
    playSong(playBoxBtn);
  }
  setCurrentSongLocal();
}

// Function to update music info to footer
function updateMusicInfoToFooter(songIndex) {
  musicArtist.innerHTML = musics[songIndex].artist;
  musicTitle.innerHTML = musics[songIndex].title;
}

// Function to bookmark music
function bookmarkMusic(event) {
  const bookmarkBtn = event.target;
  const playListIndex = bookmarkBtn.parentElement.dataset.id;
  bookmarkBtn.classList.toggle("selected");
  if (bookmarkBtn.classList.contains("selected")) {
    playListMusics.push(musics[playListIndex - 1]);
    if (playListMusics) {
      playListMusics[playListMusics.length - 1].musicId = playListIndex;
    }

    musics[localSongValue.id - 1].isBookmarked = true;
    // if click again on bookmark button , remove selection from playlist
  } else {
    const index = playListMusics.findIndex((music) => music.id === musics[playListIndex].id);
    playListMusics.splice(index, 1);
    musics[playListIndex].isBookmarked = false;
  }

  localStorage.setItem("localPlayList", JSON.stringify(playListMusics));
  updatePlayList(playListIndex);
}

// Function to update play list
function updatePlayList(playListIndex) {
  playList.innerHTML = "";
  playListMusics.forEach((music, index) => {
    playList.insertAdjacentHTML(
      "beforeend",
      `<div class="music-box music-box-${playListIndex - 1}" data-id='${playListIndex - 1}'>
      <div class="music__banner">
          <img src="${music.cover}"  alt="music_image" class="music-image">
          <div class="music__button-wrapper">
              <button class="music__button" onclick="selectPlayList(event)">
                <i class="fas fa-play"></i>
              </button>
          </div>
      </div>
      <div class="music-info">${music.artist} - ${music.title}</div>
      </div>`,
    );
    const playListBtn = playList.querySelector(`.music-box-${playListIndex - 1} .music__button`);
    playListMusics.forEach((music) => {
      localPlayList.push(music);
    });
  });
}

function selectPlayList(e) {
  const playBox = e.target.parentElement.parentElement.parentElement;
  const playListBtn = e.target;
  const index = playBox.dataset.id;
  const playBoxBtn = findPlayBoxBtn(+index + 1);

  if (playListBtn.innerHTML === '<i class="fas fa-play"></i>') {
    playListBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playListBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  playSongByIconBox(playBoxBtn, index);
  updateMusicInfoToFooter(index - 1);
}

// Function to show current time playing
function setCurrentTime() {
  currentSongIndex = JSON.parse(localStorage.getItem("currentSong"));

  let currentTimeMinutes = Math.floor(audio.currentTime / 60);
  let currentTimeSeconds = Math.floor(audio.currentTime % 60);
  if (currentTimeSeconds < 10) {
    currentTimeSeconds = `0${currentTimeSeconds}`;
  }
  if (currentTimeMinutes < 10) {
    currentTimeMinutes = `0${currentTimeMinutes}`;
  }
  if (currentSongIndex) musics[currentSongIndex.id - 1].currentPlayTime = audio.currentTime;
  currentTime.innerHTML = `${currentTimeMinutes}:${currentTimeSeconds}`;
}

function setLocalMusics() {
  let currentSong = JSON.parse(localStorage.getItem("currentSong"));
  if (currentSong) {
    currentSong.currentPlayTime = audio.currentTime;
    localStorage.setItem("currentSong", JSON.stringify(currentSong));
  } else {
    currentSong = musics[0];
    localStorage.setItem("currentSong", JSON.stringify(currentSong));
  }
}
setInterval(setLocalMusics, 100);

// Function to show duration of the song
function setDuration() {
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);
  if (isNaN(durationMinutes) || isNaN(durationSeconds)) {
    durationMinutes = 0;
    durationSeconds = 0;
    duration.innerHTML = "00:00";
    return;
  } else {
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationMinutes < 10) {
      durationMinutes = `0${durationMinutes}`;
    }
    duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  }
}

// Function to go to next song in the list by current index
function goToNextSong() {
  const playBtn = document.querySelector("#play");
  currentSongIndex = localSongValue.id - 1;
  currentSongIndex++;
  localSongValue.id++;

  if (currentSongIndex > musics.length - 1) {
    currentSongIndex = 0;
    localSongValue.id = 1;
  }
  setTimeout(setDuration, 100);
  updateMusicInfoToFooter(currentSongIndex);
  audio.src = musics[currentSongIndex].music;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  setCurrentSongLocal();
  changeBoxIcon(currentSongIndex + 1);
}

function setCurrentSongLocal() {
  currentSong = {
    id: musics[localSongValue.id - 1].id,
    title: musics[localSongValue.id - 1].title,
    artist: musics[localSongValue.id - 1].artist,
    music: musics[localSongValue.id - 1].music,
    cover: musics[localSongValue.id - 1].cover,
    currentPlayTime: 1,
    duration: musics[localSongValue.id - 1].duration,
    isBookmarked: musics[localSongValue.id - 1].isBookmarked,
  };
  localStorage.setItem("currentSong", JSON.stringify(currentSong));
}

// Function to go to previous song in the list by current index
function goToPrevSong() {
  currentSongIndex = localSongValue.id - 1;
  const playBtn = document.querySelector("#play");
  currentSongIndex--;
  localSongValue.id--;
  if (currentSongIndex < 0) {
    currentSongIndex = musics.length - 1;
    localSongValue.id = musics.length;
  }
  setTimeout(setDuration, 100);
  updateMusicInfoToFooter(currentSongIndex);
  audio.src = musics[currentSongIndex].music;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  setCurrentSongLocal();
  changeBoxIcon(currentSongIndex + 1);
}

// Function to mute or unmute volume
function MuteVolume() {
  if (audio.volume === 0) {
    audio.volume = 1;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.querySelector(".volume").style.width = "110px";
  } else {
    audio.volume = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.querySelector(".volume").style.width = "0px";
  }
}

volumeBtn.addEventListener("click", MuteVolume);
audio.addEventListener("ended", goToNextSong);

// Update progress bar width according to current time
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.querySelector(".progress").style.width = `${progress}%`;
  if (audio.currentTime === audio.duration) {
    goToNextSong();
  }
}

// Update progress bar width according to click
progressRange.addEventListener("click", (e) => {
  let progressWidth = progressRange.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / progressWidth) * audio.duration;
});

// Update volume bar width according to click
volumeRange.addEventListener("click", (e) => {
  volumeRange.querySelector(".volume").style.width = `${e.offsetX}px`;
  audio.volume = e.offsetX / 110;
});

playBtn.addEventListener("click", playSongByPlayIcon);
nextBtn.addEventListener("click", goToNextSong);
prevBtn.addEventListener("click", goToPrevSong);

// show local playlist and local song info from local storage
window.addEventListener("DOMContentLoaded", showLocalPlayList);
function showLocalPlayList() {
  const localList = JSON.parse(localStorage.getItem("localPlayList"));
  let localSong = JSON.parse(localStorage.getItem("currentSong"));

  if (!localSong) {
    localSong = musics[0];
  }
  playList.innerHTML = "";
  if (localList) {
    localList.forEach((music) => {
      playList.insertAdjacentHTML(
        "beforeend",
        `<div class="music-box music-box-${music.musicId}" data-id='${music.musicId - 1}' >
      <div class="music__banner">
          <img src="${music.cover}"  alt="music_image" class="music-image">
          <div class="music__button-wrapper">
              <button class="music__button" onclick="selectPlayList(event)">
                <i class="fas fa-play"></i>
              </button>
          </div>
      </div>
      <div class="music-info">${music.artist} - ${music.title}</div>
      </div>`,
      );
    });
  }
  showMusics();

  musicArtist.innerHTML = localSongValue.artist;
  musicTitle.innerHTML = localSongValue.title;
  audio.src = localSongValue.music;
  audio.currentTime = localSongValue.currentPlayTime;
  setCurrentTime();
  setTimeout(setDuration, 100);
  updateProgress();
}
