
const nomePokemon           = document.querySelector('.nome_pokemon');
const numeroPokemon         = document.querySelector('.id_pokemon');
const imagemPokemon         = document.querySelector('.img_pokemon');
const formProcurarPokemon   = document.querySelector('.form_procurarPokemon');
const inputProcurarPokemon  = document.querySelector('.input_buscaPokemon');
const btnPrevPokemon        = document.querySelector('.btn-prev');
const bntNextPokemon        = document.querySelector('.btn-next');
const types                 = document.querySelector('.types');
const dMain                 = document.querySelector('.principal');

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
let pokemonInicial= 1 ;
const BuscarPokemon = async (pokemon)=>{

    const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
        if (respostaAPI.status === 200) {
            const data = await respostaAPI.json();
            return data;
    }

}


const renderPokemon = async (pokemon)=>{

    const data= await BuscarPokemon(pokemon);

    nomePokemon.innerHTML = '...';
    numeroPokemon.innerHTML = '';

    if (data) {
        const cortipo1 =coresTipos[data['types'][0]['type']['name']];
        nomePokemon.innerHTML=data.name;
        numeroPokemon.innerHTML=data.id;
        inputProcurarPokemon.value='';
        pokemonInicial=data.id;
        dMain.style= `background-image: radial-gradient(circle, ${cortipo1}b9 16%, ${cortipo1} 71%), url(../img/pokebola.png);background-repeat: no-repeat;`;
        if(!data['types'][1]){

           types.innerHTML=`<span class="tipo1_pokemon text-base px-[0.2rem] w-1/4 rounded-sm" style="background:${cortipo1}"> ${data['types'][0]['type']['name']}</span>`
        }else{
            const cortipo2 =coresTipos[data['types'][1]['type']['name']];
            types.innerHTML=
               `<span class="tipo1_pokemon text-base px-[0.2rem] w-1/4 rounded-sm" style="background:${cortipo1};"> ${data['types'][0]['type']['name']}</span>
                <span class="tipo2_pokemon text-base px-[0.2rem] w-1/4 rounded-sm" style="background:${cortipo2};"> ${data['types'][1]['type']['name']}</span>`
        }

        imagemPokemon.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else {
        nomePokemon.innerHTML = 'Não encontrado';
        numeroPokemon.innerHTML = '';
        imagemPokemon.src='../img/notfound.png';
        
    }
   
}

formProcurarPokemon.addEventListener('submit',(event)=>{
    event.preventDefault();

    renderPokemon(inputProcurarPokemon.value.toLowerCase());
    
});
btnPrevPokemon.addEventListener('click', () => {
    if (pokemonInicial > 1) {
        pokemonInicial -= 1;
      renderPokemon(pokemonInicial);
    }
});
  
bntNextPokemon.addEventListener('click', () => {
    pokemonInicial += 1;
    renderPokemon(pokemonInicial);
});



renderPokemon(pokemonInicial);