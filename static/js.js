const $grid = document.querySelector('#mygrid');
const $pokepelota = document.querySelector('#pokepelota');
const $popup = document.querySelector('#popup1');
const $siguiente = document.querySelector('#siguiente');
const $anterior = document.querySelector('#anterior');
const $inicio = document.querySelector('#first');
const $logo = document.querySelector('#logo');
const $barra = document.querySelector('#barrabusqueda');
const $form = document.querySelector('#barrabusqueda');

const CANTIDAD_DE_CARTAS = 12;
let pagina = 0;

const URL = 'https://pokeapi.co/api/v2/';


function esconder($element) {
    $element.classList.add('d-none');
}

function mostrar($element) {
    $element.classList.remove('d-none');
}

function esconderPopup() {
    $popup.style.opacity = 0;
    $popup.style.visibility = 'hidden';
}

function mostrarPopup() {
    $popup.style.opacity = 1;
    $popup.style.visibility = 'visible';
}

function abilitarPopup(){
    esconder($pokepelota);
    mostrar($grid);
    manejarFlechas();
}

function mostrarCartasyPagina() {
    mostrar($grid);

    document.querySelector('body').style.removeProperty('display');

    mostrar($barra);
    mostrar($logo);
}

function manejarFlechas() {
    if (pagina === 0) {
        esconder($inicio);
        mostrar($siguiente);
        esconder($anterior);
    } else {
        mostrar($inicio);
        mostrar($siguiente);
        mostrar($anterior);
    }
}


function addPokemonToPage(valor, indice) {
    document.querySelectorAll('.pokemon-nombre')[indice].innerHTML = `
    <a href="javascript:void(0)">
    ${resultados[valor].name.charAt(0).toUpperCase() + resultados[valor].name.slice(1)}
    </a>
    `
}

function esconderPagina() {

    esconder($logo);
    esconder($siguiente);
    esconder($anterior);
    esconder($inicio);
    esconder($barra);
    esconder($grid);
}

function buscarPokemon(pokemon) {
    fetch(URL +`pokemon/${pokemon}`)
        .then(pokemonAPIresponse => pokemonAPIresponse.json())
        .then(pokemonAPIresponseJSON => {
            rellenarPopup(pokemonAPIresponseJSON);
            document.querySelector('#popup').classList.remove('d-none');
            
            abilitarPopup();
        })
        .catch(() => {
            alert('No se pudo encontrar ese pokemon, intente nuevamente')
            esconderPopup();
            abilitarPopup();
        });

    esconder($grid);
    esconder($anterior);
    esconder($inicio);
    esconder($siguiente);
    mostrar($pokepelota);
    document.querySelector('#popup').classList.add('d-none');
    mostrarPopup();
}

function traerPokemones(limite, desplazamiento) {
    fetch(URL + `pokemon?limit=${limite}&offset=${desplazamiento}`)
        .then(pokemonAPIresponse => pokemonAPIresponse.json())
        .then(pokemonAPIresponseJSON => {
            resultados = pokemonAPIresponseJSON.results;

            Object.keys(resultados).forEach((value, index) => {
                addPokemonToPage(value, index);
            })

            esconder($pokepelota);
            mostrarCartasyPagina();

            manejarFlechas();

        })
        .catch(() => alert('Hubo un error, intente nuevamente o más tarde.'));

    mostrar($pokepelota);
}

function rellenarPopup(pokemon) {
    document.querySelector('#pokemon-name').textContent = pokemon.forms[0].name.toUpperCase();
    document.querySelector('#pokemon-img').src = pokemon.sprites.other['official-artwork'].front_default;
    document.querySelector('#tipo').textContent = pokemon.types[0].type.name;
    document.querySelector('#vida').textContent = pokemon.stats[0].base_stat;
    document.querySelector('#ataque').textContent = pokemon.stats[1].base_stat;
    document.querySelector('#defensa').textContent = pokemon.stats[2].base_stat;
}

function agarrarPokemonPorNombre(pokemon) {
    fetch(URL + `pokemon/${pokemon}`)
        .then(pokemonAPIresponse => pokemonAPIresponse.json())
        .then(pokemonAPIresponseJSON => {
            console.log(pokemonAPIresponseJSON);
            rellenarPopup(pokemonAPIresponseJSON);
            document.querySelector('#popup').classList.remove('d-none');
        })
    document.querySelector('#popup').classList.add('d-none');
    mostrarPopup();
}

function crearCartitas() {
    for (i = 0; i < CANTIDAD_DE_CARTAS; i++) {
        $grid.innerHTML += (`
        
        <div class="card bg border border-5">
            <img src="static/img/pokepelota.png" alt="pokeball">
            <h2 class="card p-1 text-center pokemon-nombre justify-content-center"></h2>
        </div>
        
        `);
    }
}


crearCartitas();
traerPokemones(CANTIDAD_DE_CARTAS, pagina);


$siguiente.onclick = function (e) {

    pagina += CANTIDAD_DE_CARTAS

    esconderPagina();
    traerPokemones(CANTIDAD_DE_CARTAS, pagina);

    e.preventDefault();
}

$anterior.onclick = function (e) {

    pagina -= CANTIDAD_DE_CARTAS;

    esconderPagina();
    traerPokemones(CANTIDAD_DE_CARTAS, pagina);

    e.preventDefault();
}

document.querySelectorAll('.pokemon-nombre').forEach((value) => {

    value.onclick = function (e) {
        let pokemon = e.currentTarget.textContent.replace(/\s/g, '');
        pokemon = pokemon.toLowerCase();

        agarrarPokemonPorNombre(pokemon);
    }

})

document.querySelector('#close').onclick = () => {
    esconderPopup();
}

$form['buscar'].onclick = (e) => {
    console.log($form['pokemon'].value);

    buscarPokemon($form['pokemon'].value.toLowerCase());

    e.preventDefault();
}