import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">

         <section id="buttons">
            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" id="previous" onClick={this.props.handlePrevClick}>
              <span className="material-icons">skip_previous</span>
            </button>
            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"id="play-pause" onClick={this.props.handleSongClick} >
              <span className="material-icons"> {this.props.isPlaying ? "pause_circle_outline" : "play_circle_outline"} </span>
            </button>
            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" id="next" onClick={this.props.handleNextClick}>
              <span className="material-icons">skip_next</span>
            </button>
          </section>

          <section id="time-control">
            <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
            <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
            <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
          </section>

          <section id="volume-control">
            <i class="material-icons">volume_mute</i>
            <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={this.props.volume}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleVolumeChange}
            />
            <i class="material-icons">volume_up</i>
          </section>
       </section>
     );
   }
 }

 export default PlayerBar;
