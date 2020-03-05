import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header';
import Finder from './Components/Finder';
import Pokedex from './Components/Pokedex';
import axios from 'axios'


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
       caughtPokemon: [],
    }
    this.catchPokemon = this.catchPokemon.bind(this)
    this.saveName = this.saveName.bind(this)
    this.releasePokemon = this.releasePokemon.bind(this)
  }

  componentDidMount(){
    axios.get('/api/pokemon')
    .then(response => {
      this.setState({
        caughtPokemon: response.data
      })
  })
  }

  catchPokemon(pokemon){
    axios.post('/api/pokemon', {pokemon})
    .then(response => {
      this.setState({
        caughtPokemon: response.data
      })
    })
  }

  saveName(id, newName){
    axios.put(`/api/pokemon/${id}`, {name: newName})
    .then(response => {
      this.setState({
        caughtPokemon: response.data
      })
    })
  }

  releasePokemon(id){
    axios.delete(`/api/pokemon/${id}`)
    .then(response => {
      this.setState({
        caughtPokemon: response.data
      })
    })
  }

  render(){
    return(
      <div className='App'>
        <Header />
        <Finder catchPokemon = {this.catchPokemon} />
        <Pokedex 
          releasePokemon = {this.releasePokemon}
          saveName = {this.saveName}
          caughtPokemon = {this.state.caughtPokemon}
        /> 
      </div>
    )
  }
}


export default App;
