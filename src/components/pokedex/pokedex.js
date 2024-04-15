import './pokedex.css'
import { getColorType } from '../pokemon-type-colours'

import { useState, useEffect } from 'react';
// imports for radar chart //CDN: import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm'
import {
    Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from "chart.js";
import { Radar } from "react-chartjs-2"; //Doughnut,

export default function Pokedex() {
    const defaultPokemon = { id: 0, name: "", types: [], stats: { pokemon: [], labels: [], data: [] }, weight: 0, height: 0, abilities: "---", sprite: "https://img.itch.zone/aW1nLzk4ODIxOTQuZ2lm/original/NigZHO.gif" }

    const [pokes, setPokes] = useState([])
    const [pokemon, setPokemon] = useState(defaultPokemon)
    const [statusDisplay, setStatusDisplay] = useState(false)

    useEffect(() => {
        ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
    }, [])

    const fetchData = () => {
        setStatusDisplay(false)
        setPokemon(defaultPokemon)
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(pokes => setPokes(pokes.results))
    }

    const displayPokemon = async (event) => {
        const namePoke = event.target.innerText
        const { id, name, sprite, types, stats, height, weight } = await getPokemonByName(namePoke)

        setStatusDisplay(true)
        setPokemon({ ...pokemon, id, sprite, name, types, stats, height, weight })
    }

    const getPokemonByName = async (name) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await response.json()
        const id = data.id
        const spriteLink = data.sprites.other.showdown.front_default
        const types = data.types.map(type => type.type.name)
        const weight = data.weight
        const height = data.height

        // const statsMap = JSON.parse(JSON.stringify({ ...pokemon.stats }))
        const statsMap = { pokemon: [], labels: [], data: [] }
        data.stats.map(statItem => {
            const label = statItem.stat.name
            const stat = statItem.base_stat
            // ESTRUCTURA: {labels: [aquí push, label], data:[aquí push, stat]}
            statsMap.labels.push(label)
            statsMap.data.push(stat)
            // ESTRUCTURA: [{"hp": 45}, {"defense":73}, ... ,{"speed":123}]
            statsMap.pokemon.push({ [label]: stat })
            return true
        })
        return { id, name, sprite: spriteLink, types, stats: statsMap, height, weight }
    }

    const getStatusDisplay = () => {
        return statusDisplay ? "display-ON" : "display-OFF"
    }
    const ifOn_DisplayThis = (toDisplay) => {
        return statusDisplay ? toDisplay : ""
    }

    const getRadarChartData = (pokemonStats) => {
        const labels = pokemonStats.labels
        const data = pokemonStats.data
        const dataForChart = {
            labels, datasets: [{
                data, label: `${pokemon.name}'s Stats`,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }]
        }
        return dataForChart
    }

    const getRadarChartOptions = () => {
        return {
            plugins: { legend: { labels: { font: { size: 15 } } } },
            scales: {
                r: {
                    min: 0, max: 150, ticks: {
                        backdropPadding: -5, count: 4, backdropColor: "rgba(0,0,0,0)", font: { size: 8 },
                        callback: function (value, index, ticks) { return "        " + value }
                    },
                }
            }
        }
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

            <div className="pokedex parte-derecha">
                <img className='pokedex-logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="" srcSet="" />

                <div className={"info-pokemon pokedex-display " + getStatusDisplay()}>
                    <div className="pokemonName">{ifOn_DisplayThis(pokemon.name)}</div>
                    <div className="pokemonTypes">
                        {
                            pokemon.types.map((type, idx) =>
                                <div key={idx} className="type color" style={{ backgroundColor: getColorType(type) }}> {type} </div>
                            )
                        }
                    </div>
                    <div className="pokemonWeight">{ifOn_DisplayThis("Weight: " + pokemon.weight)}</div>
                    <div className="pokemonHeight">{ifOn_DisplayThis("Height: " + pokemon.height)}</div>
                </div>

                <div className={"grafico-stats pokedex-display " + getStatusDisplay()}>
                    {
                        ifOn_DisplayThis(
                            <Radar data={getRadarChartData(pokemon.stats)} options={getRadarChartOptions()} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}