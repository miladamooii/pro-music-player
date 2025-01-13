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
const musics = [
  { id: 1, title: "band naf", artist: "Yas", music: "musics/yas-band-e-naf.mp3", cover: "images/yas.jpg", currentPlayTime: 0, duration: 1 },
  {
    id: 2,
    title: "Nookie",
    artist: "Limp Bizkit",
    music: "musics/03 - Nookie.mp3",
    cover: "images/nookie.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 3,
    title: "Animals",
    artist: "Nickelback",
    music: "musics/04 - Animals.mp3",
    cover: "images/Animals.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 4,
    title: "Sun Is Up",
    artist: "Inna",
    music: "musics/05-Sun Is Up.mp3",
    cover: "images/Sun Is Up.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 5,
    title: "Be Khod Ay",
    artist: "Aidin Joodi",
    music: "musics/105 - Be Khod Ay - Aidin Joodi.mp3",
    cover: "images/Aidin Joodi.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 6,
    title: "Bloody Mary",
    artist: "Lady Gaga",
    music: "musics/Lady Gaga Bloody Mary.mp3",
    cover: "images/Lady Gaga.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 7,
    title: "I Just Died In Your Arms",
    artist: "Cutting Crew",
    music: "musics/Cutting_Crew_I_Just_Died_In_Your.mp3",
    cover: "images/Cutting Crew.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
  {
    id: 8,
    title: "shadow lady",
    artist: "Portwave",
    music: "musics/Portwave - Shadow Lady.mp3",
    cover: "images/Shadow Lady.jpg",
    currentPlayTime: 0,
    duration: 1,
  },
];
const playListMusics = [];
let currentSongIndex = 0;
let isFirstPlay = true;
let musicBoxIndex = 1;

// IIFE to add event listener to all music boxes
function showMusics() {
  musics.forEach((musicBox, index) => {
    currentSongIndex = index;
    updateMusicInfo();
  });
  const musicBoxBtns = document.querySelectorAll(".music__button");
  musicBoxBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const musicBox = e.target.parentElement.parentElement.parentElement;
      playSongByIconBox(btn, index);
      setTimeout(setDuration, 100);
      updateMusicInfoToFooter(musicBox);
    });
  });
  setInterval(setCurrentTime, 1000);
  currentSongIndex = 0;
}

showMusics();

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
    musics[currentSongIndex].currentPlayTime = audio.currentTime;
    pauseSong(playBtn);
  } else {
    if (pauseIcon) {
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
    currentSongIndex = index;
    audio.src = musics[currentSongIndex].music;
    playSong(playBtn);
    audio.currentTime = musics[currentSongIndex].currentPlayTime;
    audio.duration = musics[currentSongIndex].duration;
  }
}

// Function to find play box button by current song index
function findPlayBoxBtn(currentIndex) {
  let songIndex = musics.findIndex((music) => music.id === +currentIndex);
  console.log(currentIndex);

  let playBoxBtn = document.querySelector(`.music-box-${songIndex + 1} .music__button`);
  return playBoxBtn;
}

function findPlayListBtn() {
  let songIndex = playListMusics.findIndex((music) => music.id === currentSongIndex + 1);
  let playListBtn = document.querySelector(`.music-box-${songIndex + 1}.music__playlist-button`);
  return playListBtn;
}

// Function to change box icon to pause when playing
function changeBoxIcon() {
  const playBoxBtn = findPlayBoxBtn(currentSongIndex + 1);
  let pauseIcon = document.querySelector(".fa-pause");
  if (pauseIcon) {
    pauseIcon.classList.remove("fa-pause");
    pauseIcon.classList.add("fa-play");
  }
  playBoxBtn.children[0].classList.remove("fa-play");
  playBoxBtn.children[0].classList.add("fa-pause");
}

function playSong(playBoxBtn) {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playBoxBtn.innerHTML = "<i class='fas fa-pause'></i>";
}

function pauseSong(playBoxBtn) {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBoxBtn.innerHTML = "<i class='fas fa-play'></i>";
}

// Function to play current song
function playSongByPlayIcon() {
  setTimeout(setDuration, 100);
  // Check if it's the first time play
  if (isFirstPlay) {
    audio.src = musics[currentSongIndex].music;
    updateMusicInfoToFooter();
    isFirstPlay = false;
  }
  const playBoxBtn = findPlayBoxBtn(currentSongIndex + 1);
  if (playBoxBtn.children[0].classList.contains("fa-pause")) {
    pauseSong(playBoxBtn);
    musics[currentSongIndex].currentPlayTime = audio.currentTime;
  } else {
    playSong(playBoxBtn);
  }
}

// Function to update music info to footer
function updateMusicInfoToFooter() {
  musicArtist.innerHTML = musics[currentSongIndex].artist;
  musicTitle.innerHTML = musics[currentSongIndex].title;
}

// Function to bookmark music
function bookmarkMusic(event) {
  const bookmarkBtn = event.target;
  const playListIndex = bookmarkBtn.parentElement.dataset.id;
  bookmarkBtn.classList.toggle("selected");
  if (bookmarkBtn.classList.contains("selected")) {
    playListMusics.push(musics[playListIndex - 1]);
  // if click again on bookmark button , remove selection from playlist
  } else {
    const index = playListMusics.findIndex((music) => music.id === musics[currentSongIndex].id);
    playListMusics.splice(index, 1);
  }
  updatePlayList(playListIndex);
}

// Function to update play list
function updatePlayList(playListIndex) {
  const playList = document.querySelector(".playlist-boxes");
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
    
  });
}

function selectPlayList(e) {
  const playBox = e.target.parentElement.parentElement.parentElement;
  const playListBtn = e.target;
  const index = playBox.dataset.id;
  const playBoxBtn = findPlayBoxBtn(+index + 1);
  if (playListBtn.innerHTML === '<i class="fas fa-play"></i>') {
    playListBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    playListBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  playSongByIconBox(playBoxBtn, index);
  updateMusicInfoToFooter(playBox);
}

// Function to show current time playing
function setCurrentTime() {
  let currentTimeMinutes = Math.floor(audio.currentTime / 60);
  let currentTimeSeconds = Math.floor(audio.currentTime % 60);
  if (currentTimeSeconds < 10) {
    currentTimeSeconds = `0${currentTimeSeconds}`;
  }
  if (currentTimeMinutes < 10) {
    currentTimeMinutes = `0${currentTimeMinutes}`;
  }
  currentTime.innerHTML = `${currentTimeMinutes}:${currentTimeSeconds}`;
}

// Function to show duration of the song
function setDuration() {
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  if (durationMinutes < 10) {
    durationMinutes = `0${durationMinutes}`;
  }
  duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  console.log(audio.duration);
  
}

// Function to go to next song in the list by current index
function goToNextSong() {
  currentSongIndex++;
  if (currentSongIndex > musics.length - 1) {
    currentSongIndex = 0;
  }
  changeBoxIcon();
  setTimeout(setDuration, 100);
  updateMusicInfoToFooter();
  audio.src = musics[currentSongIndex].music;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Function to go to previous song in the list by current index
function goToPrevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = musics.length - 1;
  }
  setTimeout(setDuration, 100);
  updateMusicInfoToFooter();
  changeBoxIcon();
  audio.src = musics[currentSongIndex].music;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
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

playBtn.addEventListener("click", playSongByPlayIcon);
nextBtn.addEventListener("click", goToNextSong);
prevBtn.addEventListener("click", goToPrevSong);
volumeBtn.addEventListener("click", MuteVolume);
audio.addEventListener("ended", goToNextSong);

// Update progress bar width according to current time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.querySelector(".progress").style.width = `${progress}%`;
  if (audio.currentTime === audio.duration) {
    goToNextSong();
  }
});

// Update progress bar width according to click
progressRange.addEventListener("click", (e) => {
  const progressWidth = e.target.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / progressWidth) * audio.duration;
});

// Update volume bar width according to click
volumeRange.addEventListener("click", (e) => {
  volumeRange.querySelector(".volume").style.width = `${e.offsetX}px`;
  audio.volume = e.offsetX / 110;
});
