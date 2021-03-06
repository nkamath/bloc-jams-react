import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       mouseFocusIndex: -1,
       isPlaying: false,
       currentTime: 0,
       duration: album.songs[0].duration,
       volume: 0.5
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
     this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
   this.audioElement.src = null;
   this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
   this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
 }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = song === this.state.currentSong;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handleMouseEnter(index){
    this.setState({mouseFocusIndex:index});
  }

  handleMouseLeave(){
    this.setState({mouseFocusIndex: -1});
  }

  handleSongIcon(index) {
    const isElementFocused = index === this.state.mouseFocusIndex;
    const isElementCurrentSong = this.state.album.songs[index] === this.state.currentSong;

    if ((isElementFocused && !isElementCurrentSong) || (isElementCurrentSong && !this.state.isPlaying)) {
      return <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">play_circle_outline</i></button>
    } else if (this.state.isPlaying && isElementCurrentSong) {
      return <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">pause_circle_outline</i></button>
    } else {
        return index + 1;
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
   }

   handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }

   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

   handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.volume = newVolume;
     this.setState({ volume: newVolume });
   }

   formatTime(timeInSeconds) {
     if (isNaN(timeInSeconds)) {
       return "-:--";
     } else {
       const minutes = Math.floor(timeInSeconds/60);
       const seconds = Math.floor(timeInSeconds % 60);
       return minutes + ":" + (seconds > 9 ? "" + seconds : "0" + seconds);
     }
   }

  render() {
    return (
      <div className="album">
        <Grid container spacing ={24}>
          <Grid item id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
             <div className="album-details">
               <Typography variant="h4" id="album-title">{this.state.album.title}</Typography>
               <Typography variant="h5" className="artist">{this.state.album.artist}</Typography>
               <Typography variant="h5" id="release-info">{this.state.album.releaseInfo}</Typography>
             </div>
           </Grid>
           <Grid item>
             <table className="container" id="song-list">
             <tbody>
               <tr>
                  <th>Number</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
                {this.state.album.songs.map((song, index) =>
                    <tr className="song" key = {index} onClick={() => this.handleSongClick(song)} onMouseEnter = {() => this.handleMouseEnter(index)} onMouseLeave = {() => this.handleMouseLeave()}>
                      <td>{this.handleSongIcon(index)}</td>
                      <td>{song.title}</td>
                      <td>{this.formatTime(song.duration)}</td>
                    </tr>
                )}
               </tbody>
             </table>
           </Grid>
           <Grid item>
             <PlayerBar
               isPlaying={this.state.isPlaying}
               currentSong={this.state.currentSong}
               handleSongClick={() => this.handleSongClick(this.state.currentSong)}
               handlePrevClick={() => this.handlePrevClick()}
               handleNextClick={() => this.handleNextClick()}
               currentTime={this.audioElement.currentTime}
               duration={this.audioElement.duration}
               handleTimeChange={(e) => this.handleTimeChange(e)}
               volume={this.audioElement.volume}
               handleVolumeChange={(e) => this.handleVolumeChange(e)}
               formatTime = {this.formatTime}
             />
         </Grid>
       </Grid>
     </div>
    );
  }
}

export default Album;
