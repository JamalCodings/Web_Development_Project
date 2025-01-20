console.log("Hello spotify lovers ");

//**************************** */ function for timeupdate            *****************8*********************

function secToMinSec(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    // play.src = "./img/pause.svg"
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  // console.log("minutes ::", minutes );

  const remainingSeconds = Math.floor(seconds % 60);
  // console.log("remainingSeconds ::", remainingSeconds );

  const formattedMinutes = String(minutes).padStart(2, "0");
  // console.log("formattedMinutes ::", formattedMinutes );

  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  // console.log("formattedSeconds ::", formattedSeconds );

  return `${formattedMinutes}:${formattedSeconds} `;
}

let currentSong = new Audio();
let songs;
let currFolder;

// ****************************************    songFtn(folder)    *********************************************
async function songFtn(folder) {
  //   console.log("folder output ", folder);

  currFolder = folder;
  //   console.log("currFolder ", currFolder);

  try {
    // Fetching the HTML content of the directory
    let response = await fetch(`http://127.0.0.1:5500/03-Projects/12-Dec31-Spotify-Project/song-play/${folder}/` );
    // console.log(response);

    // Checking if the response is ok (status 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Getting the text content (HTML) of the response
    let htmlContent = await response.text();
    // console.log(htmlContent);
    

    // Creating a temporary div to parse the HTML
    let div = document.createElement("div");
    div.innerHTML = htmlContent;

    // Getting all <a> tags from the fetched HTML
    let aHref = div.getElementsByTagName("a");
    // console.log("aherf ", aHref);

    // Converting NodeList to an array and filtering out .mp3 links
    let songs = Array.from(aHref).filter((element) => element.href.endsWith(".mp3")).map((element) =>{
      // console.log(element);
      // console.log(element.href.split(`/${folder}/`)[1]);
      return element.href.split(`/${folder}/`)[1]
      
    } );
    //   console.log("songs check ", songs );

    // show all the song in playList
    // replaceAll(".mp3" , " ")
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = " ";
    for (const song of songs) {
      songUL.innerHTML = songUL.innerHTML + `<li/>
                        <img class="invert" src="./img/music.svg" alt="">
                        <div class="info">
                            <div> ${song.replaceAll("%20", " ")}</div>

                            <div>Jam Plays</div>
                        </div>
                        <div class="playNow">
                            <span>Play Now</span>
                            <img class="invert" src="./img/play.svg" alt="">
          </li>`;
    }

    // Attach an event listener  to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
      e.addEventListener("click", (element) => {
        // console.log(e.querySelector(".info").firstElementChild.innerHTML.trim());
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
      });
    });

    // console.log("MP3 Songs:", songs);
    return songs;
  } catch (error) {
    console.error("Error fetching or processing the content:", error);
  }

    return songs;
}

// ****************************************    playMusic    *********************************************

let playMusic = (track, pause = false) => {
  console.log("track", track);
  
  //  let audio = new Audio("http://127.0.0.1:5500/03-Projects/12-Dec31-Spotify-Project/song-play/" + track)
  currentSong.src =`http://127.0.0.1:5500/03-Projects/12-Dec31-Spotify-Project/song-play/${currFolder}/` + track;

  console.log("currentSong", currentSong);
  
  if (!pause) {
    currentSong.play();
    play.src = "./img/pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

// ****************************************    displayAlbums    *********************************************

async function displayAlbums() {
  // console.log("displaying albums");

  try {
    let a = await fetch( `http://127.0.0.1:5500/03-Projects/12-Dec31-Spotify-Project/song-play/` );

    if (!a.ok) {
      throw new Error("Network response was not ok");
    }

    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");

    let cardContainer = document.querySelector(".cardContainer");
    let array = Array.from(anchors);
    // console.log(array.length);

    for (let index = 0; index < array.length ; index++) {
      const e = array[index];
      // console.log(e);

      if (e.href.includes(`/song-play/`) && !e.href.includes(".htaccess")) {
        // console.log('hey bro');
        let folder = e.href.split("/").slice(-2)[1];
        // let folder = e.href.split("/").slice(-2)[1];
        // console.log(folder);

        let a = await fetch(`http://127.0.0.1:5500/03-Projects/12-Dec31-Spotify-Project/song-play/${folder}/info.json` );
        let response = await a.json();
        //  console.log(response);

         cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                        <div class="play">   <img src="img/play.svg" alt=""> </div>
                        <img src="./song-play/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
         
      }
    }
  } catch (error) {
    console.error("Error fetching or processing the content:", error);
  }

   //   ########################################################################################33

  //   Load the playlist whenever card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    // console.log(e);
    e.addEventListener("click", async (item) => {
      //   console.log("item" ,item);
      //   console.log(item.currentTarget.dataset.folder);
      songs = await songFtn(`${item.currentTarget.dataset.folder}`);
      playMusic(songs[0])
    });
  });
  //   ########################################################################################33



}

// ****************************************    main    *********************************************

// Main function to fetch and display songs
async function main() {
  songs = await songFtn(`lofiSong`);
  // playMusic(songs[0])

  // songs = await songFtn("ncs");
  //   console.log("Fetched Songs:", songs);

  playMusic(songs[0], true);

  //   #######################################################################################

  // Display the album of songs with the help of js function is write above and call in js
  displayAlbums();

  //   #######################################################################################

  // Attach an event listener to play pause and next
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./img/play.svg";
    }
  });

  //   ############################################################################################

  // Listen for timeUpdate event
  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.currentTime);
    // console.log(currentSong.duration);

    if ( Math.floor(currentSong.currentTime) === Math.floor(currentSong.duration)) {
      play.src = "./img/play.svg";
    }
    // console.log(currentSong.currentTime, currentSong.duration);
    console.log(`"secToMinSec(currentSong.currentTime)}" ::  ${secToMinSec(currentSong.currentTime)}`);
    console.log(`"secToMinSec(currentSong.duration)}" ::  ${secToMinSec(currentSong.duration)}`);
    
    document.querySelector(".songTime").innerHTML = `${secToMinSec(currentSong.currentTime)} / ${secToMinSec(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    console.log((currentSong.currentTime / currentSong.duration)*100 + "%" )
    

    console.log("(currentSong.currentTime ::  ", currentSong.currentTime , "currentSong.duration ::  ", currentSong.duration);
  });

  //   ########################################################################################33

  //   Add and event listener to seekbar
  document.querySelector(".seekBar").addEventListener("click", (e) => {
    // console.log(e.offsetX);
    // console.log(e.target.getBoundingClientRect());
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //   ########################################################################################33

  //   Add and event listener to hamBurger

  document.querySelector(".hamBurger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  //   ########################################################################################33
  //   Add and event listener to closeHamburger

  document.querySelector(".closeHamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  //   ########################################################################################33
  //   Add and event listener to previous

  previous.addEventListener("click", () => {
    // console.log('Previous clicked');

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  //   ########################################################################################33
  //   Add and event listener to next

  next.addEventListener("click", () => {
    // currentSong.pause();
    // console.log(songs);
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    // console.log("index ", index);
    // console.log("next length ", length);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  //   ########################################################################################33
  //   Add and event listener to volume

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      // console.log(e, e.target.value);
      currentSong.volume = parseInt(e.target.value) / 100;
      if (currentSong.volume > 0) {
        document.querySelector('.volume>img').src =  document.querySelector('.volume>img').src.replace("mute.svg", "volume.svg" )
      }
    });

     //   ########################################################################################33
  //   Add and event listener to mute the volume 

  document.querySelector('.volume>img').addEventListener('click', e=>{
    // console.log(e.target);
    // console.log('changing ', e.target.src);
    if (e.target.src.includes("volume.svg")) {
      // console.log('hello volume g');
      e.target.src = e.target.src.replace("volume.svg", "mute.svg")
      currentSong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
      
    } else{
      e.target.src = e.target.src.replace("mute.svg", "volume.svg" )
      currentSong.volume = .50;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 50;

    }
    
    
  })

 
}

// Run the main function
main();

console.log("program end");
