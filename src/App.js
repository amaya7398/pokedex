import './App.css';
import { useEffect, useState } from "react"

function App() {

  const [pokes, setPokes] = useState([])
  const [pokemon, setPokemon] = useState('')

  const fetchData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(pokes => setPokes(pokes.results))
  }

  const displayAllPokemons = () => {
    return 
  }

  const displayPokemon = async (event) => {
    const namePoke = event.target.innerText
    const spritesLink = await getPokemonByName(namePoke)
    setPokemon(spritesLink)
  }

  const getPokemonByName = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    const sprite = data.sprites.other.showdown.front_default
    return sprite
  }

  const spritePokemon = () => {
    return pokemon === ''
      ? "https://img.itch.zone/aW1nLzk4ODIxOTQuZ2lm/original/NigZHO.gif"
      : pokemon
  }

  return (
    <div className="consola">

      <div className="pokedex parte-izquierda">
        <img className='pokedex-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="" srcSet="" />
        <div className="pokedex-display">
          <img src={spritePokemon()} alt="pokemon sprite" srcSet="" />
        </div>
        <button className='pokedex-button' onClick={fetchData}>Catch all pokemon</button>
        <div className="pokedex-info">
          <ul className='pokedex-info-pokes'>
            {
              pokes.map((pk, idx) =>
                <li key={idx} onClick={displayPokemon} >{pk.name}</li>)
            }
          </ul>
        </div>
        <div className="pokedex-buttons-selection"></div>
      </div>

      {/* TODO:
      Cambiar esta sección, para desplegar información del pokemon seleccionado.
      Ya sean sus ataques o una gráfica de teleraña para sus stats. */}
      <div className="pokedex parte-derecha">
        <img className='pokedex-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="" srcSet="" />
        <div className="pokedex-display">
          <img src={spritePokemon()} alt="pokemon sprite" srcSet="" />
        </div>
      </div>

    </div>
  );
}

export default App;
