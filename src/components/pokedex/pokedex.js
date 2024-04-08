import './pokedex.css'
import { getColorType } from '../pokemon-type-colours'
import { useState } from 'react';

export default function Pokedex() {
    const defaultPokemon = { id: 0, name: "---", types: [], stats: [], weight: 0, height: 0, abilities: "---", sprite: "https://img.itch.zone/aW1nLzk4ODIxOTQuZ2lm/original/NigZHO.gif" }

    const [pokes, setPokes] = useState([])
    const [pokemon, setPokemon] = useState(defaultPokemon)
    const [statusDisplay, setStatusDisplay] = useState(false)

    const fetchData = () => {
        setPokemon(defaultPokemon)
        setStatusDisplay(false)
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(pokes => setPokes(pokes.results))
    }

    const displayPokemon = async (event) => {
        const namePoke = event.target.innerText
        const { id, name, sprite, types, stats, height, weight } = await getPokemonByName(namePoke)

        setPokemon({ ...pokemon, id, sprite, name, types, stats, height, weight })
        setStatusDisplay(true)
        console.log({ pokemon })
    }

    const getPokemonByName = async (name) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await response.json()

        console.log(data)

        const id = data.id
        const spriteLink = data.sprites.other.showdown.front_default
        const types = data.types.map(type => type.type.name)
        const weight = data.weight
        const height = data.height
        const stats = data.stats
        // [] map( x => x.stat.name x.base_stat)

        return { id, name, sprite: spriteLink, types, stats, height, weight }
    }

    const getStatusDisplay = () => {
        return statusDisplay ? "display-ON" : "display-OFF"
    }


    return (
        <div className="consola">

            <div className="pokedex parte-izquierda">
                <img className='pokedex-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="" srcSet="" />
                <div className={"pokedex-display " + getStatusDisplay()}>
                    <img src={pokemon.sprite} alt="pokemon sprite" srcSet="" />
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

                <div className={"info-pokemon pokedex-display " + getStatusDisplay()}>
                    <div className="pokemonName">{pokemon.name}</div>
                    <div className="pokemonTypes">
                        {
                            pokemon.types.map((type, idx) =>
                                <div key={idx} className="type color" style={{ backgroundColor: getColorType(type) }}> {type} </div>
                            )
                        }
                    </div>
                    <div className="pokemonWeight">{"Weight " + pokemon.weight}</div>
                    <div className="pokemonHeight">{"Height " + pokemon.height}</div>
                </div>

                <div className={"grafico-stats pokedex-display " + getStatusDisplay()}>
                    <div className="grafico-estrella">
                        Color #82c166
                    </div>
                </div>

            </div>

        </div>
    );
}