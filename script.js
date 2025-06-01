class MusicPlayer {
  constructor() {
    this.MusicPlayer = [];
  }
  addMusic(Music) {
    this.MusicPlayer.push(Music);
  }
  showMusic() {
    this.MusicPlayer.forEach(function (song) {
      console.log(
        `Song name: ${song.name} by artist ${song.artist} from collection: ${song.collection}- image - ${song.imgurl}- and song duration - ${song.time}`
      );
    });
  }
}
class Music {
  constructor(Name, artist, collection, songurl, imgurl, time) {
    this.name = Name;
    this.artist = artist;
    this.song = songurl;
    this.collection = collection;
    this.imgurl = imgurl;
    this.time = time;
  }
}

// putting the all music in MusicPlayer
function getmusic(music) {
  for (let i = 0; i < music.length; i++) {
    let time = music[i].trackTimeMillis;
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let totaltime = `${minutes}:${seconds}`;

    let song = new Music(
      music[i].trackName,
      music[i].artistName,
      music[i].collectionName,
      music[i].previewUrl,
      music[i].artworkUrl100,
     totaltime
    );
    Mp1.addMusic(song);
  }
}

let Mp1 = new MusicPlayer();

// fetching the music api
const url = "https://itunes.apple.com/search?term=beatles&entity=song";

fetch(url)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    getmusic(data.results);
    MusicFunctionality();
  })
  .catch(function (error) {
    console.error("There was a problem with the fetch operation:", error);
  });

let artistname = document.querySelector(".artist");
let collection = document.querySelector(".collection");
let imgurl = document.querySelector(".screen img");
let songname = document.querySelector(".songname");
let songprogress = document.querySelector(".songprogress");
let playbtn = document.querySelector(".playbtn i");
let audioplayer = document.querySelector(".audioplayer");
let previousbtn = document.querySelector(".previousbtn i");
let backwardbtn = document.querySelector(".backwardbtn i");
let likebtn = document.querySelector(".likebtn i");
let forwardbtn = document.querySelector(".forwardbtn i");
let nextbtn = document.querySelector(".nextbtn i");

function MusicFunctionality(index) {
  const song = Mp1.MusicPlayer[index];

  artistname.innerHTML = song.artist;
  collection.innerHTML = song.collection;
  imgurl.src = song.imgurl;
  songname.innerHTML = song.name;
  audioplayer.src = song.song;
  playbtn.classList.remove("ri-play-large-line");
  playbtn.classList.add("ri-pause-fill");
  
  audioplayer.load();
  audioplayer.pause();
}

//song progress starts
songprogress.onchange = function () {
  audioplayer.play();
  audioplayer.currentTime = songprogress.value;
  playbtn.classList.add("ri-pause-fill");
  playbtn.classList.remove("ri-play-large-line");
};
//song progress ends

// playbutton logic starts
playbtn.addEventListener("click", function () {
  if (playbtn.classList.contains("ri-play-large-line")) {
    playbtn.classList.remove("ri-play-large-line");
    playbtn.classList.add("ri-pause-fill");
    audioplayer.play();
  } else {
    playbtn.classList.add("ri-play-large-line");
    playbtn.classList.remove("ri-pause-fill");
    audioplayer.pause();
  }
});
// playbutton logic ends

// console.log(Mp1.MusicPlayer.length)

// progress bar logic starts here
audioplayer.onloadedmetadata = function () {
  songprogress.max = audioplayer.duration;
  songprogress.value = audioplayer.currentTime;

  if (audioplayer.play()) {
    setInterval(() => {
      songprogress.value = audioplayer.currentTime;
    }, 500);
  }
};
//progress bar logic ends here

// forward and backward button logic starts
backwardbtn.addEventListener("click", function () {
  console.log("backwardbtn pressed");
  if (audioplayer.currentTime - 10 > 0) {
    audioplayer.currentTime -= 10;
    songprogress.value = audioplayer.currentTime;
  }
});
forwardbtn.addEventListener("click", () => {
  console.log("forwardbtn pressed");
  if (audioplayer.currentTime + 10 < audioplayer.duration) {
    audioplayer.currentTime += 10;
    songprogress.value = audioplayer.currentTime;
  }
});

// forward and backward button logic ends

//  Likebutton logic starts here
likebtn.addEventListener("click", function () {
  if (likebtn.classList.contains("ri-heart-3-fill")) {
    likebtn.classList.remove("ri-heart-3-fill");
    likebtn.classList.add("ri-heart-3-line");
  } else {
    likebtn.classList.remove("ri-heart-3-line");
    likebtn.classList.add("ri-heart-3-fill");
  }
});
// Likebutton logic ends here

// previous,next button logic starts
let currentsongidx = 0;

previousbtn.addEventListener("click", function () {
  if (currentsongidx > 0) {
    currentsongidx--;
    MusicFunctionality(currentsongidx);
  }
});

nextbtn.addEventListener("click", function () {
  if (currentsongidx < Mp1.MusicPlayer.length - 1) {
    currentsongidx++;
    MusicFunctionality(currentsongidx);
  }
});
// previous,next button logic ends

