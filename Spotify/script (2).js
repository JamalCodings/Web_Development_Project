
let songIndex = 0;
let audioElement = new Audio('Songs/2.mp4');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:  "Check Kar",  filePath: "Songs/2.mp4", coverPath: "Images/Song-logo.avif", timing: "5:34" },
    {songName:  "CHEQUES",  filePath: "Songs/3.mp4", coverPath: "Images/song-logo2.png", timing: "5:34" },
    {songName:  "Still Rollin",  filePath: "Songs/4.mp4", coverPath: "Images/song-logo3.jpg", timing: "5:34"  },
    {songName:  "No Love",  filePath: "Songs/5.mp4", coverPath: "Images/song-logo4.png", timing: "5:34"  },
    {songName:  "Afsanay",  filePath: "Songs/6.mp4", coverPath: "Images/song-logo5.png", timing: "5:34"  },
    {songName:  "GUMAAN",  filePath: "Songs/7.mp4", coverPath: "Images/song-logo6.png", timing: "5:34"  },
]

songItem.forEach((element, i) =>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].timeStamp;


    
});

// audioElement.play();

// Handle  play/pause click 

masterPlay.addEventListener('click', ()=>{
             if (audioElement.paused || audioElement.currentTime<=0) {
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;

                
             } 
             else {
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play'); 
                gif.style.opacity = 0;
             }
})

audioElement.addEventListener('timeupdate', ()=>{

    //Update SeekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime  =  myProgressBar.value * audioElement.duration/100;
})

// *******************                                      *******************



// *******************                                     ************************


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp4`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp4`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp4`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

