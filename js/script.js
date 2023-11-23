
const nomePokemon           = document.querySelector('.nome_pokemon');
const numeroPokemon         = document.querySelector('.id_pokemon');
const imagemPokemon         = document.querySelector('.img_pokemon');
const formProcurarPokemon   = document.querySelector('.form_procurarPokemon');
const inputProcurarPokemon  = document.querySelector('.input_buscaPokemon');
const btnPrevPokemon        = document.querySelector('.btn-prev');
const bntNextPokemon        = document.querySelector('.btn-next');
const types = document.querySelector('.types');

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

        nomePokemon.innerHTML=data.name;
        numeroPokemon.innerHTML=data.id;
        inputProcurarPokemon.value='';
        pokemonInicial=data.id;

        if(!data['types'][1]){
           console.log("ok");
           types.innerHTML=`<span class="tipo1_pokemon text-base bg-red-500 px-[0.2rem] w-1/4 rounded-sm"> ${data['types'][0]['type']['name']}</span>`
        }else{
            types.innerHTML=
               `<span class="tipo1_pokemon text-base bg-red-500 px-[0.2rem] w-1/4 rounded-sm"> ${data['types'][0]['type']['name']}</span>
                <span class="tipo2_pokemon text-base bg-red-500 px-[0.2rem] w-1/4 rounded-sm"> ${data['types'][1]['type']['name']}</span>`
        }

        imagemPokemon.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else {
        nomePokemon.innerHTML = 'Não encontrado';
        numeroPokemon.innerHTML = '';
        imagemPokemon.src='../img/notfound';
        
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