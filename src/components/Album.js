import React, {Component} from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       mouseFocusSong: -1,
       isPlaying: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
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
    this.setState({mouseFocusSong:index});
    //console.log("Enter " + index);
  }

  handleMouseLeave(){
    //console.log("Exit ");
    this.setState({mouseFocusSong:-1});
  }

  handleSongIcon(index){
    if(this.state.mouseFocusSong === -1) {
      if(this.state.album.songs[index] !== this.state.currentSong){
        return index+1;
      } else {
        if(this.state.isPlaying){
          return <span className="ion-pause">
                    <ion-icon name="pause"></ion-icon>
                </span>
        } else {
          return <span className="ion-play">
            <ion-icon name="play"></ion-icon>
          </span>
        }
      }
      // case when mouse is focused on a song
    } else {
      if (this.state.album.songs[this.state.mouseFocusSong] === this.state.currentSong) {
        if(this.state.isPlaying){
          return <span className="ion-play">
                    <ion-icon name="play"></ion-icon>
                </span>
        } else {
          return <span className="ion-pause">
            <ion-icon name="pause"></ion-icon>
          </span>
        }
      }
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
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
                  <td>{song.duration}</td>
                </tr>
            )}
           </tbody>
         </table>
      </section>
    );
  }
}

export default Album;
