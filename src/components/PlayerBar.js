import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">

         <section id="buttons">
            <button id="previous" onClick={this.props.handlePrevClick}>
              <span className="material-icons">skip_previous</span>
            </button>
            <button id="play-pause" onClick={this.props.handleSongClick} >
              <span className="material-icons"> {this.props.isPlaying ? "pause_circle_outline" : "play_circle_outline"} </span>
            </button>
            <button id="next" onClick={this.props.handleNextClick}>
              <span className="material-icons">skip_next</span>
            </button>
          </section>

          <section id="time-control">
            <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
            <input
              type="range"
              className="seek-bar"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
            <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
          </section>

          <section id="volume-control">
            <span className="material-icons">volume_mute</span>
            <input
              type="range"
              className="seek-bar"
              value={this.props.volume}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleVolumeChange}
            />
            <span className="material-icons">volume_up</span>

          </section>
       </section>
     );
   }
 }

 export default PlayerBar;
