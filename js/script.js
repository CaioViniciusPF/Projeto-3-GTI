
const nomePokemon           = document.querySelector('.nome_pokemon');
const numeroPokemon         = document.querySelector('.id_pokemon');
const imagemPokemon         = document.querySelector('.img_pokemon');
const formProcurarPokemon   = document.querySelector('.form_procurarPokemon');
const formNomePokemon       = document.querySelector('.form_nomePokemon');
const inputProcurarPokemon  = document.querySelector('.input_buscaPokemon');
const inputNomePokemon      = document.querySelector('.input_nomePokemon');
const btnverPokemon         = document.querySelector('.btnver-time');
const btnPrevPokemon        = document.querySelector('.btn-prev');
const btnNextPokemon        = document.querySelector('.btn-next');
const types                 = document.querySelector('.types');
const dMain                 = document.querySelector('.principal');
const btnaddTime            = document.querySelector('.btnadd-time');
const time=[];
const tiraPokemon          = document.querySelectorAll('.imgPokeTime');
let posicaoArray=0;
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
const nomesPokemon = [
    `bulbasaur`, `ivysaur`, `venusaur`, `charmander`, `charmeleon`, `charizard`,
    `squirtle`, `wartortle`, `blastoise`, `caterpie`, `metapod`, `butterfree`,
    `weedle`, `kakuna`, `beedrill`, `pidgey`, `pidgeotto`, `pidgeot`, `rattata`,
    `raticate`, `spearow`, `fearow`, `ekans`, `arbok`, `pikachu`, `raichu`,
    `sandshrew`, `sandslash`, `nidoran♀`, `nidorina`, `nidoqueen`, `nidoran♂`,
    `nidorino`, `nidoking`, `clefairy`, `clefable`, `vulpix`, `ninetales`,
    `jigglypuff`, `wigglytuff`, `zubat`, `golbat`, `oddish`, `gloom`, `vileplume`,
    `paras`, `parasect`, `venonat`, `venomoth`, `diglett`, `dugtrio`, `meowth`,
    `persian`, `psyduck`, `golduck`, `mankey`, `primeape`, `growlithe`, `arcanine`,
    `poliwag`, `poliwhirl`, `poliwrath`, `abra`, `kadabra`, `alakazam`, `machop`,
    `machoke`, `machamp`, `bellsprout`, `weepinbell`, `victreebel`, `tentacool`,
    `tentacruel`, `geodude`, `graveler`, `golem`, `ponyta`, `rapidash`, `slowpoke`,
    `slowbro`, `magnemite`, `magneton`, `farfetch'd`, `doduo`, `dodrio`, `seel`,
    `dewgong`, `grimer`, `muk`, `shellder`, `cloyster`, `gastly`, `haunter`,
    `gengar`, `onix`, `drowzee`, `hypno`, `krabby`, `kingler`, `voltorb`, `electrode`,
    `exeggcute`, `exeggutor`, `cubone`, `marowak`, `hitmonlee`, `hitmonchan`,
    `lickitung`, `koffing`, `weezing`, `rhyhorn`, `rhydon`, `chansey`, `tangela`,
    `kangaskhan`, `horsea`, `seadra`, `goldeen`, `seaking`, `staryu`, `starmie`,
    `mr. mime`, `scyther`, `jynx`, `electabuzz`, `magmar`, `pinsir`, `tauros`,
    `magikarp`, `gyarados`, `lapras`, `ditto`, `eevee`, `vaporeon`, `jolteon`,
    `flareon`, `porygon`, `omanyte`, `omastar`, `kabuto`, `kabutops`, `aerodactyl`,
    `snorlax`, `articuno`, `zapdos`, `moltres`, `dratini`, `dragonair`, `dragonite`,
    `mewtwo`, `mew`
  ];
let pokemonInicial=1;

function isNumeric(str) {
    var er = /^[0-9]+$/;
    return (er.test(str));
}

const BuscarPokemon = async (pokemon)=>{

    if (isNumeric(pokemon) && pokemon<=151 ) {
        const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if (respostaAPI.status === 200) {
            const data = await respostaAPI.json();
            return data;
    }
    }
    if (typeof pokemon=='number' && pokemon<=151 ) {
        const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if (respostaAPI.status === 200) {
            const data = await respostaAPI.json();
            return data;
    }
    }

    if(typeof pokemon=='string' && nomesPokemon.includes(pokemon) ){
        const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
            if (respostaAPI.status === 200) {
                const data = await respostaAPI.json();
                return data;
        }
    }
}


const renderPokemon = async (pokemon)=>{

    const data= await BuscarPokemon(pokemon);


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
    renderPokemon( inputProcurarPokemon.value.toLowerCase());
    
});

btnPrevPokemon.addEventListener('click', () => {
    if (pokemonInicial > 1) {
        pokemonInicial -= 1;
      renderPokemon(pokemonInicial);
    }
});
  
btnNextPokemon.addEventListener('click', () => {
    if (pokemonInicial < 151 ) {
    pokemonInicial += 1;
    renderPokemon(pokemonInicial);
    }
});

btnaddTime.addEventListener('click', () => {
    if (posicaoArray<6) {
        time[posicaoArray]=pokemonInicial;
        document.querySelector('.imgP' + posicaoArray).setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInicial}.png` );
        posicaoArray+=1;
    }
    for (let index = 0; index < 6; index++) {

           
        if (time[index]!=undefined) {


            document.querySelector('.imgP' + index).setAttribute('class', ' hoverTiraPokemon imgP' + index);
        }
        
    }
});

tiraPokemon.forEach((div,index)=>{div.addEventListener('click', () =>{
    if (time[index] != undefined) {
        time.splice(index,1)
        
        posicaoArray--;
        for (let index = 0; index < 6; index++) {

           
            if (time[index]==undefined) {
                document.querySelector('.imgP' + index).setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png` );
                document.querySelector('.imgP' + index).setAttribute('class','imgP'+index);

            }else{
                document.querySelector('.imgP' + index).setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${time[index]}.png` );
                
            }
            
        }

    }
});})

btnverPokemon.addEventListener('click',()=>{ 
    let nomeTime = inputNomePokemon.value;
    if(nomeTime.length !== 0 && time.length==6){
        const timestring = encodeURIComponent(JSON.stringify(time));
        window.localStorage.setItem('nomeTime', nomeTime);
        window.localStorage.setItem('timestring', timestring);
        window.location.href = "times.html";
    }
    
    if (nomeTime.length === 0) {
        alert('Coloque um nome no seu time');
    }
    if (time.length<6) {
        alert('Complete time');
    }
    
}); 



renderPokemon(pokemonInicial);

/* window.location.href=`times.html?time=${time}` */