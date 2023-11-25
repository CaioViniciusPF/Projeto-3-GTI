const nome_time = localStorage.getItem('nomeTime');
const timestring = localStorage.getItem('timestring');
const time = JSON.parse(decodeURIComponent(timestring));

const coresTipos={
    normal: '#a8a878',
    fire: '#f05030',
    water: '#6890f0',
    electric: '#f8d030',
    grass: '#78c850',
    ice: '#98d8d8',
    fighting: '#903028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#A6B91A',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#D685AD',
}
const nometime = document.querySelector('.nome_time');
nometime.innerHTML=nome_time;

const BuscarPokemon = async (pokemon)=>{
    const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (respostaAPI.status === 200) {
        const data = await respostaAPI.json();
        return data;
    }
}
const carregarPokemons = async () => {

    for (let index = 0; index < 6; index++) {
        const pokemonData = await BuscarPokemon(time[index]);

        if (pokemonData) {
            const cortipo1 =coresTipos[pokemonData['types'][0]['type']['name']];
            document.querySelector('.id_pokemon' + index).innerHTML=pokemonData.id;
            document.querySelector('.nome_pokemon' + index).innerHTML=pokemonData.name;
            document.querySelector('.hp' + index).innerHTML=pokemonData['stats'][0]['base_stat'];
            document.querySelector('.att' + index).innerHTML=pokemonData['stats'][1]['base_stat'];
            document.querySelector('.def' + index).innerHTML=pokemonData['stats'][2]['base_stat'];
            document.querySelector('.speed' + index).innerHTML=pokemonData['stats'][5]['base_stat'];
            document.querySelector('.imgP' + index).src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            if(!pokemonData['types'][1]){

                document.querySelector('.types' + index).innerHTML=`<span class="tipo1_pokemon${index} text-base px-[0.2rem] w-1/4 rounded-sm" style="background:${cortipo1}"> ${pokemonData['types'][0]['type']['name']}</span>`
             }else{
                 const cortipo2 =coresTipos[pokemonData['types'][1]['type']['name']];
                 document.querySelector('.types' + index).innerHTML=
                    `<span class="tipo1_pokemon${index} text-base px-[0.2rem] rounded-sm" style="background:${cortipo1};"> ${pokemonData['types'][0]['type']['name']}</span>
                     <span class="tipo2_pokemon${index}  text-base px-[0.2rem]  rounded-sm" style="background:${cortipo2};"> ${pokemonData['types'][1]['type']['name']}</span>`
             }
        } else {
            console.error(`Falha ao obter dados para o Pokémon ${time[index]}`);
        }
    }
};

carregarPokemons();

    

