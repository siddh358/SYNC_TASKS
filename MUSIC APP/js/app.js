const music = new Audio('https://www.computerhope.com/jargon/m/example.mp3');
let songPlaybackPositions = {};

// create Array 
const songs = [{
        id: '1',
        songName: "Automn Leaves",
        artist : "Frank Sinatra",
        poster: "https://i.scdn.co/image/ab67616d0000b27313db2c9c7d2355ac026f3fd7"
    },
    {
        id: '2',
        songName: "The Alcott",
        artist : "The National, Taylor Swift",
        poster: "https://i.scdn.co/image/ab67616d0000b273364c819937072957a9220847"
    },
    {
        id: '3',
        songName: "Open Arms",
        artist : "SZA, Travis Scott",
        poster: "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1"
    },
    {
        id: '4',
        songName: "Runner",
        artist : "Brenni",
        poster: "https://i.scdn.co/image/ab67616d0000b273ff4bc82938eefc2f1ba2f7d9"
    },
    {
        id: '5',
        songName: "You",
        artist : "Ari Abdul",
        poster: "https://i.scdn.co/image/ab67616d0000b2730950fd0340be6da85ffb55ac"
    },
    {
        id: '6',
        songName: "Die For You - Remix",
        artist : "The Weekend",
        poster: "https://i.scdn.co/image/ab67616d0000b2738de12a274f6e1df6634f57ec"
    },
    {
        id: '7',
        songName: "Creepin'",
        artist : "Metro, The Weekend",
        poster: "https://i.scdn.co/image/ab67616d0000b273c91ab2dd6fcff9b7228ff7ac"
    },
]


/* ---------- initialize the song list (Updating the song items in the HTML) ----------*/
Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    const img = element.getElementsByClassName('img2')[0];
    const title = element.getElementsByClassName('title')[0];
    const artist = element.getElementsByClassName('artist')[0];
    img.src = songs[i].poster;
    title.innerHTML = songs[i].songName;
    artist.innerHTML = songs[i].artist;
})

// Handling the MASTER PLAY BUTTON (play/pause functionality)
let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

        document.getElementById(`${index}`).classList.remove('fa-play');
        document.getElementById(`${index}`).classList.add('fa-pause');
    } else {
        music.pause();
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');

        document.getElementById(`${index}`).classList.add('fa-play');
        document.getElementById(`${index}`).classList.remove('fa-pause');
    }
})


/* ------------------- Set all play icons to 'play' state -------------------*/
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('play-button')).forEach((element) => {
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    })
}


let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

// Function to handle the song selection and play
Array.from(document.getElementsByClassName('play-button')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        if (music.paused || music.currentTime <= 0) {
            // Play the selected song
            music.src = `audio/${index}.mp3`;
            poster_master_play.src = `img/${index}.jpg`;
            music.play();
            let song_title = songs.filter((ele) => {
                return ele.id == index;
            });

            song_title.forEach(ele => {
                let {
                    songName
                } = ele;
                title.innerHTML = songName;
            });

            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');

        }
         else if (music.src !== `http://127.0.0.1:5501/audio/${index}.mp3`) {
            console.log(`audio/${index}.mp3`)
            console.log(music.src)
       
            music.pause();

            music.src = `audio/${index}.mp3`;
            poster_master_play.src = `img/${index}.jpg`;
            music.play();
            let song_title = songs.filter((ele) => {
                return ele.id == index;
            });

            song_title.forEach(ele => {
                let {
                    songName
                } = ele;
                title.innerHTML = songName;
            });

            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
         else {

            music.pause();

            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');

            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');

        }

        music.addEventListener('ended', () => {
            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
        });
    });
});


/* ------------------------ Song Seeking ----------------------- */
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('input', () => {
    music.currentTime = (seek.value / 100) * music.duration;
});

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
});



/* ------------------------ Handle the song Volume ----------------------- */
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

// VOLUME
vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
})

// Set initial position of volume bar
vol_bar.style.width = `${vol.value}%`;
vol_dot.style.left = `${vol.value}%`;


/* -------------------- Handle the song NEXT and BACK -------------------- */
let back = document.getElementById('back');
let next = document.getElementById('next');

// BACK
back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {
            songName
        } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()


    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

})
//NEXT
next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {
            songName
        } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

})


/* --------------------------------------------------------------------------------------------------------- */

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})



//Function to handle the add button click event
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const audioURL = reader.result;
            const audio = new Audio(audioURL);
            const songId = songs.length + 1;
            const songName = `Custom Song ${songId}`;
            const poster = 'img/default.jpg';

            // Create a new song object
            const newSong = {
                id: songId.toString(),
                songName,
                poster,
            };

            // Add the new song to the songs array
            songs.push(newSong);

            // Update the 'music' object with the new audio URL
            music.src = audioURL;

            poster_master_play.src = "https://f4.bcbits.com/img/a4139357031_10.jpg";

            song_title = document.getElementById('title');
            song_artist = document.getElementById('artist1');

            song_artist.innerHTML = "Unkown Artist";

            // Create the HTML elements for the new song
            const songItem = document.createElement('li');
            songItem.classList.add('songItem');

            const songContainer = document.createElement('div');
            songContainer.classList.add('song-container');

            const playButton = document.createElement('i');
            playButton.classList.add('fas', 'play-button', 'fa-play');
            playButton.id = songId.toString();
            playButton.style.color = '#000000';

            const img = document.createElement('div');
            img.classList.add('img');

            const imgTag = document.createElement('img');
            imgTag.src = "https://f4.bcbits.com/img/a4139357031_10.jpg";
            imgTag.alt = 'Album Poster';

            const title = document.createElement('div');
            title.classList.add('title');
            title.style.marginTop = '0px';

            const h5 = document.createElement('div');
            h5.innerHTML = songName;

            const artist = document.createElement('div');
            artist.classList.add('artist');
            artist.textContent = 'Unknown Artist';
            
            artist.textContent.style="color: #b3b3b3;font-size: 12px;padding-left: 19px;padding-top: 5px;padding-bottom: 10px;"

            // Append the HTML elements to the DOM
            title.appendChild(h5);
            img.appendChild(imgTag);
            songContainer.appendChild(playButton);
            songContainer.appendChild(img);
            songContainer.appendChild(title);
            songContainer.appendChild(artist);
            songItem.appendChild(songContainer);

            const songList = document.querySelector('.pop_song');
            songList.appendChild(songItem);

            // Add click event listener to the new play button
            playButton.addEventListener('click', (e) => {
                index = e.target.id;
                makeAllPlays();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');

                if (music.paused || music.currentTime <= 0) {
                    // Play the selected song
                    poster_master_play.src = poster;
                    music.play();

                    let song_title = songs.filter((ele) => {
                        return ele.id == index;
                    });

                    song_title.forEach(ele => {
                        let {
                            songName
                        } = ele;
                        title.innerHTML = songName;
                    });

                    masterPlay.classList.remove('fa-play');
                    masterPlay.classList.add('fa-pause');
                } else {
                    // Pause the currently playing song
                    music.pause();

                    masterPlay.classList.add('fa-play');
                    masterPlay.classList.remove('fa-remove');
                    e.target.classList.remove('fa-pause');
                    e.target.classList.add('fa-play');
                }

                music.addEventListener('ended', () => {
                    masterPlay.classList.add('fa-play');
                    e.target.classList.remove('fa-pause');
                    e.target.classList.add('fa-play');
                });
            });
        });
        reader.readAsDataURL(file);
    });
    fileInput.click();
});