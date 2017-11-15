/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDOYsgdgQtwGhlOscjp3hUkH61fj-DpXsuT3XVZPIm8kHYtOHfBMTCnb-4qyvEGVveKniQ1l1V9RERld_Y6MvwN0HA5b0JoYoFrpwgxyTR7HJ9wIWQ3e1Tgg5dNiwFcZVciks6CKlvjgyCOc3NdhjbO7IpgqhM';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  
  render(){
    const src = this.props.track.album.images[0].url
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }

}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      songsLoaded: false
    };
  }

  componentDidMount(){
    this.setState({
      text: "Bonjour"
    });
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(response => response.json())
    .then((data) => {
      console.log("Reponse reçue! Voilà ce que j'ai reçu : ", data);
      this.setState({
        tracks: data.items,
        text: "First song : " + data.items[0].track.name,
        songsLoaded: true,
        currentTrack: data.items[getRandomNumber(data.items.length)].track
      });
      console.log(this.state.tracks[0].track.name)
    })
  }

  checkAnswer(id){
    if (id == this.state.currentTrack.id)
      swal('Bravo', "C'est la bonne chanson !", 'success');
    else
      swal('Oops...', "Ce n'est pas la bonne chanson ...", 'error');
  }

  render() {
    if(!this.state.songsLoaded)
      return(
        <img src={loading} className="App-logo" alt="logo"/>
      );
    else {
      
      var song0 = this.state.currentTrack;
      var song1 = this.state.tracks[getRandomNumber(this.state.tracks.length)].track;
      var song2 = this.state.tracks[getRandomNumber(this.state.tracks.length)].track;
      var songs = [song0, song1, song2];
      songs = shuffleArray(songs);

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={song0}/>
            <Sound url={song0.preview_url} playStatus={Sound.status.PLAYING} />
          </div>
          <div className="App-buttons">
            <Button onClick={() => this.checkAnswer(songs[0].id)}>{songs[0].name}</Button>
            <Button onClick={() => this.checkAnswer(songs[1].id)}>{songs[1].name}</Button>
            <Button onClick={() => this.checkAnswer(songs[2].id)}>{songs[2].name}</Button>
          </div>
        </div>
      );
    }
  }

}

export default App;
