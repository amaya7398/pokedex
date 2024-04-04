import './App.css';
import { useEffect, useState } from "react"

function App() {

  const [pokes, setPokes] = useState([])
  const [sprite, setSprite] = useState('')

  const fetchData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(pokes => setPokes(pokes.results))
  }

  const displayAllPokemons = () => {
    return <ul className='pokedex-info-pokes'>
      {
        pokes.map((pk, idx) =>
          <li key={idx} onClick={displayPokemon} >{pk.name}</li>)
      }
    </ul>
  }

  const displayPokemon = async (event) => {
    const namePoke = event.target.innerText
    const spritesLink = await getPokemonByName(namePoke)
    setSprite(spritesLink)
  }

  const getPokemonByName = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    const sprite = data.sprites.other.showdown.front_default
    return sprite
  }

  const spritePokemon = () => {
    const spriteSrc = sprite === ''
      ? "https://img.itch.zone/aW1nLzk4ODIxOTQuZ2lm/original/NigZHO.gif"
      : sprite
    return <img src={spriteSrc} alt="pokemon sprite" srcSet="" />
  }

  return (
    <div className="pokedex">
      <img className='pokedex-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="" srcSet="" />
      <div className="pokedex-display">{spritePokemon()}</div>
      <button className='pokedex-button' onClick={fetchData}>Catch all pokemon</button>
      <div className="pokedex-info">
        {displayAllPokemons()}
      </div>
      <div className="pokedex-buttons-selection"></div>

    </div>
  );
}

export default App;
