import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
         <section id="buttons">
            <button id="previous" onClick={this.props.handlePrevClick}>
              <span className="ion-skip-backward"> <ion-icon name="skip-backward" /> </span>
            </button>
            <button id="play-pause" onClick={this.props.handleSongClick} >
              <span className={this.props.isPlaying ? "ion-pause" : "ion-play"}> <ion-icon name={this.props.isPlaying ? "pause" : "play"} /> </span>
            </button>
            <button id="next">
              <span className="ion-skip-forward"> <ion-icon name="skip-forward" /> </span>
            </button>
          </section>
          <section id="time-control">
            <div className="current-time">–:––</div>
            <input type="range" className="seek-bar" value="0" />
            <div className="total-time">–:––</div>
          </section>
          <section id="volume-control">
            <div className="icon ion-volume-low"> <ion-icon name="volume-low" /> </div>
            <input type="range" className="seek-bar" value="80" />
            <div className="icon ion-volume-high"> <ion-icon name="volume-high" /> </div>
          </section>
       </section>
     );
   }
 }

 export default PlayerBar;
