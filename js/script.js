const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btn_anterior = document.querySelector('.btn-anterior');
const btn_proximo = document.querySelector('.btn-proximo');

// Variável para armazenar o número do Pokémon atual
let vPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

// Função assíncrona para renderizar os dados do Pokémon na página
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "buscando...";
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'block';

    const data = await fetchPokemon(pokemon);
    // ID do Pokémon menor ou igual a 649 - limite da geração
    if (data && data.id <= 649){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        vPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'pokémon nao encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
    input.value = ''; // Limpa o valor do input de busca
}

// Adiciona um ouvinte de evento para o formulário para buscar o Pokémon
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()); 
});

// Adiciona um ouvinte de evento para o botão próximo
btn_proximo.addEventListener('click', () => {
    vPokemon ++;
    if (vPokemon > 649){
        vPokemon = 1;
    }
    renderPokemon(vPokemon);  
});

// Adiciona um ouvinte de evento para o botão anterior
btn_anterior.addEventListener('click', () => {
    vPokemon --;
    if (vPokemon == 0){
        vPokemon = 649;
    }
    renderPokemon(vPokemon); // Chama a função para renderizar o Pokémon anterior
});

// Renderiza o Pokémon inicial (n1) ao carregar a página
renderPokemon(vPokemon);