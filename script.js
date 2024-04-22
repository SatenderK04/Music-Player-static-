let songArray = [
  {
    singer: "Arijit Singh",
    songname: "Heeriye",
    url: "./songs/_Heeriye(PagalWorld.com.sb).mp3",
    image:
      "https://c.saavncdn.com/022/Heeriye-feat-Arijit-Singh-Hindi-2023-20230928050405-500x500.jpg",
    duration: "3:19",
  },
  {
    singer: "Guru Randhawa",
    songname: "Moon rise",
    url: "./songs/Moon Rise(PagalWorld.com.sb).mp3",
    image:
      "https://c.saavncdn.com/618/Man-Of-The-Moon-Hindi-2022-20220820180617-500x500.jpg",
    duration: "2:54",
  },
  {
    singer: "Kaifi Khalil",
    songname: "Kahani 2.0",
    url: "./songs/Kahani Suno(PagalWorld.com.sb).mp3",
    image:
      "https://c.saavncdn.com/464/Kahani-Suno-2-0-Urdu-2022-20230629194127-500x500.jpg",
    duration: "2:53",
  },
  {
    singer: "Jubin Nautiyal",
    songname: "Kaash tu mila hota",
    url: "./songs/Kaash Tu Mila Hota(PagalWorld.com.sb).mp3",
    image:
      "https://c.saavncdn.com/622/Kaash-Tu-Mila-Hota-From-Code-Blue--Hindi-2019-20190725135036-500x500.jpg",
    duration: "5:27",
  },
  {
    singer: "Hardy Sandhu",
    songname: "Bijlee Bijlee",
    url: "./songs/Bijlee Bijlee(PagalWorld.com.sb).mp3",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjNkMTQwZjAtMWZiMi00MDIxLTgxY2MtOWIxY2ViZjc2N2FlXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_.jpg",
    duration: "2:49",
  },
  {
    singer: "Raghav, Asees Kaur",
    songname: "Teri Baaton Mein Aisa Uljha . . .",
    url: "./songs/Teri Baaton Mein Aisa Uljha Jiya(PagalWorld.com.sb).mp3",
    image: "https://www.pagalworld.com.sb/siteuploads/thumb/sft140/69950_4.jpg",
    duration: "2:32",
  },
  {
    singer: "Swati Mishra",
    songname: "Raam Ayenge",
    url: "./songs/Raam Aayenge(PagalWorld.com.sb).mp3",
    image: "https://www.pagalworld.com.sb/siteuploads/thumb/sft138/68830_4.jpg",
    duration: "3:53",
  },
];

let audio = new Audio();
let Poster = document.querySelector(".playing-song-img img");
let activeSong = 0;

function CreateAudioList() {
  let clutter = "";
  songArray.forEach((e, index) => {
    clutter += `<li id="${index}" class="song">
            <img src="${e.image}" class="song-image" id="${index}" alt="">
            <div>
                <p class="song-name" id="${index}">${e.songname}</p>
                <p class="singer" id="${index}">${e.singer}</p>
            </div>
            <p class="duration" id="${index}">${e.duration}</p>
        </li>`;
  });

  document.querySelector(".songs").innerHTML = clutter;
}

CreateAudioList();

function addToPlay(index) {
  activeSong = index;
  audio.src = songArray[activeSong].url;
  Poster.setAttribute("src", songArray[activeSong].image);
  audio.play();
}

document.querySelector(".songs").addEventListener("click", function (event) {
  if (
    event.target.classList.contains("song-name") ||
    event.target.classList.contains("singer") ||
    event.target.classList.contains("song") ||
    event.target.classList.contains("song-image")
  ) {
    const index = event.target.id;
    // document.querySelector(".playing-music-name").innerText =
    //   songArray[index].songname;
    // document.querySelector(".music-info").innerText = songArray[index].singer;
    addToPlay(index);
    changeSongInfo();
    play.classList.add("fa-circle-pause");
  }
});

function changeSongInfo() {
  document.querySelector(".playing-music-name").innerText =
    songArray[activeSong].songname;
  document.querySelector(".music-info").innerText =
    songArray[activeSong].singer;
}

const play = document.querySelector("#play");
// console.log(playing_music);
play.addEventListener("click", function () {
  if (audio.paused) {
    if (audio.currentTime === 0) {
      addToPlay(activeSong);
    } else {
      audio.play();
    }
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});

//////////////////////////////////////////////////////////////////////
const progressBar = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".curr-time");
const totalTime = document.querySelector(".tot-time");

const backward = document.querySelector(".fa-backward-step");
backward.addEventListener("click", function () {
  if (activeSong > 0) {
    activeSong--;
    addToPlay(activeSong);
    audio.play();
    if (play.classList.contains("fa-circle-play")) {
      play.classList.remove("fa-circle-play");
      play.classList.add("fa-circle-pause");
    }
  }
  changeSongInfo();
});

const forward = document.querySelector(".fa-forward-step");
forward.addEventListener("click", function () {
  if (activeSong < songArray.length - 1) {
    activeSong++;
    addToPlay(activeSong);
    audio.play();
    if (play.classList.contains("fa-circle-play")) {
      play.classList.remove("fa-circle-play");
      play.classList.add("fa-circle-pause");
    }
  }
  changeSongInfo();
});

audio.addEventListener("timeupdate", function () {
  const duration = audio.duration;
  const currentTimeValue = audio.currentTime;
  const progress = (currentTimeValue / duration) * 100;
  progressBar.value = progress;

  const minutes = Math.floor(currentTimeValue / 60);
  const seconds = Math.floor(currentTimeValue % 60);
  currentTime.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);
  totalTime.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;
});

progressBar.addEventListener("input", function () {
  const seekTime = audio.duration * (progressBar.value / 100);
  audio.currentTime = seekTime;
  audio.play();
  play.classList.add("fa-circle-pause");
});

// ///////////////////////////////////////////////////////////////////////////
const volumeBar = document.querySelector(".volume-bar");
const volBtn = document.querySelector("#mute");

volBtn.addEventListener("click", function () {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeBar.value = 0;
    volBtn.classList.remove("fa-volume-high");
    volBtn.classList.add("fa-volume-mute");
  } else {
    audio.volume = 1;
    volumeBar.value = 100;
    volBtn.classList.remove("fa-volume-mute");
    volBtn.classList.remove("mute");
    volBtn.classList.add("fa-volume-high");
  }
});

volumeBar.addEventListener("input", function () {
  const volume = volumeBar.value / 100;
  audio.volume = volume;
});
