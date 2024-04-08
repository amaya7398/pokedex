import { useState } from 'react';

export default function Pokedex() {
    const defaultPokemon = { name: "---", types: [], abilities: "---", sprite: "https://img.itch.zone/aW1nLzk4ODIxOTQuZ2lm/original/NigZHO.gif" }

    const [pokes, setPokes] = useState([])
    const [pokemon, setPokemon] = useState(defaultPokemon)
    const [statusDisplay, setStatusDisplay] = useState(false)

    const fetchData = () => {
        setStatusDisplay(false)
        setPokemon(defaultPokemon)
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(pokes => setPokes(pokes.results))
    }

    const displayPokemon = async (event) => {
        const namePoke = event.target.innerText
        const { name, sprite, types } = await getPokemonByName(namePoke)

        // TODO: Fetch the pokemon data from the API
        setPokemon({ ...pokemon, sprite, name, types })
        setStatusDisplay(true)
    }

    const getPokemonByName = async (name) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await response.json()
        console.log(data)
        const spriteLink = data.sprites.other.showdown.front_default
        const types = data.types.map(type => type.type.name)
        console.log(types)
        return { name, sprite: spriteLink, types }
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
                    {/* <img src={pokemon.sprite} alt="pokemon sprite" srcSet="" /> */}
                </div>

                <div className={"grafico-stats pokedex-display " + getStatusDisplay()}>
                    <div className="grafico-estrella">
                        Color #82c166
                    </div>
                </div>

                <div className="pokemonName">{pokemon.name}</div>
                {/* <div className="pokemonType">{pokemon.type}</div> */}
                <div className="pokemonAbilities">
                    {
                        pokemon.types.map((type, idx) =>
                            <div key={idx} className="ability">{type}</div>
                        )
                    }
                </div>
                <div className="pokemonAbilities">{pokemon.abilities}</div>
            </div>

        </div>
    );
}