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
       mouseFocusIndex: -1,
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
    this.setState({mouseFocusIndex:index});
  }

  handleMouseLeave(){
    this.setState({mouseFocusIndex: -1});
  }

  handleSongIcon(index) {
    const isElementFocused = index === this.state.mouseFocusIndex;
    const isElementCurrentSong = this.state.album.songs[index] === this.state.currentSong;

    if ((isElementFocused && !isElementCurrentSong) || (isElementCurrentSong && !this.state.isPlaying)) {
      return <span className="ion-play"> <ion-icon name="play" /> </span>
    } else if (this.state.isPlaying && isElementCurrentSong) {
      return <span className="ion-pause"> <ion-icon name="pause" /> </span>
    } else {
        return index + 1;
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
