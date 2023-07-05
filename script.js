console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songcurrenttime = document.getElementsByClassName("songcurrenttime");
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", songDuration: "03:50"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", songDuration: "02:33"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", songDuration: "04:33"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", songDuration: "04:27"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", songDuration: "03:28"},
    {songName: "Jim-Yosef-Arrow", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", songDuration: "03:44"},
    {songName: "Syn Cole - Feel Good", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", songDuration: "03:01"},
    {songName: "Jim-Yosef-Lights", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", songDuration: "03:45"},
    {songName: "Tobu-Good-Times", filePath: "songs/2.mp3", coverPath: "covers/9.jpg", songDuration: "03:17"},
    {songName: "Alan_Walker_Fade", filePath: "songs/4.mp3", coverPath: "covers/10.jpg", songDuration: "03:23"}
];

songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    // console.log(element.getElementsByClassName('length'));
    element.getElementsByClassName("length")[0].innerHTML = songs[i].songDuration;
});

// audioElement.play();
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Event
audioElement.addEventListener('timeupdate', ()=>{
    //update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(audioElement.currentTime);
    // console.log(songcurrenttime);
    myProgressbar.value = progress;
    let time = audioElement.currentTime;
    let min = parseInt(time/60);
    let sec = parseInt(time - (min*60));
    // console.log(min, sec);
    if(min<=9) time = "0"+min;
    else time = min;
    if(sec<=9) time = time + ":0" + sec;
    else time = time + ":" + sec; 
    songcurrenttime[0].innerText = time;
  
});

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value * audioElement.duration/100;
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = parseInt(e.target.id);
        if(songIndex==index){
            if(audioElement.paused){
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                document.getElementById(songIndex).classList.remove('fa-play-circle');
                document.getElementById(songIndex).classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
            else{
                audioElement.pause();
                makeAllPlays();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        }else{
            makeAllPlays();
            songIndex = index;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

});
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex-=1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

});

audioElement.addEventListener('ended',function(){
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    document.getElementById(songIndex).classList.remove('fa-pause-circle');
    document.getElementById(songIndex).classList.add('fa-play-circle');
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    // console.log(songIndex+1);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');

  });