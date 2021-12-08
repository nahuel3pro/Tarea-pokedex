const $grid = document.querySelector('#mygrid');
const $pokepelota = document.querySelector('#pokepelota');
const $siguiente = document.querySelector('#siguiente');
const $anterior = document.querySelector('#anterior');
const $first = document.querySelector('#first');
const $logo = document.querySelector('#logo');
const $barra = document.querySelector('#barrabusqueda');

const CANTIDAD_DE_CARTAS = 12;
let pagina = 0;
let numeroDePagina = 1;

const URL = 'https://pokeapi.co/api/v2/';
let pokemones = []


function esconderAnimacionPokepelota() {
    $pokepelota.classList.add('d-none');
}

function esconderLogo() {
    $logo.classList.add('d-none');
}

function mostrarLogo() {
    $logo.classList.remove('d-none');
}

function esconderBarra() {
    $barra.classList.add('d-none');
}

function mostrarBarra() {
    $barra.classList.remove('d-none');
}

function esconderCartas() {
    $grid.classList.add('d-none');
}

function mostrarCartas() {
    $grid.classList.remove('d-none');
}

function esconderSiguiente() {
    $siguiente.classList.add('d-none');
}

function esconderAnterior() {
    $anterior.classList.add('d-none');
}

function mostrarSiguiente() {
    $siguiente.classList.remove('d-none');
}

function mostrarAnterior() {
    $anterior.classList.remove('d-none');
}

function mostrarFirst(){
    $first.classList.remove('d-none');
}

function esconderFirst(){
    $first.classList.add('d-none');
}

function mostrarPokepelota() {
    $pokepelota.classList.remove('d-none');
}

function mostrarCartasyPagina() {
    mostrarCartas();

    document.querySelector('body').style.removeProperty('display');
    document.querySelector('body').style.removeProperty('height');

    mostrarBarra();
    mostrarLogo();
}

function manejarFlechas() {
    if (numeroDePagina === 1) {
        esconderFirst();
        mostrarSiguiente();
        esconderAnterior();
    } else {
        mostrarFirst();
        mostrarSiguiente();
        mostrarAnterior();
    }
}


function addPokemonToPage(value, index) {
    document.querySelectorAll('.pokemon-nombre')[index].innerHTML = `
    <a href="#">
    ${resultados[value].name.charAt(0).toUpperCase() + resultados[value].name.slice(1)}
    </a>
    `
}

function esconderPagina() {

    esconderLogo();

    esconderAnterior();
    esconderSiguiente();

    esconderBarra();

    esconderCartas();

}

function fetchpokemones() {
    fetch(URL + `pokemon?limit=${CANTIDAD_DE_CARTAS}&offset=${pagina}`)
        .then(pokemonAPIresponse => pokemonAPIresponse.json())
        .then(pokemonAPIresponseJSON => {
            resultados = pokemonAPIresponseJSON.results;

            Object.keys(resultados).forEach((value, index) => {
                addPokemonToPage(value, index);
            })

            esconderAnimacionPokepelota();
            mostrarCartasyPagina();

            manejarFlechas();

        })
        .catch(() => alert('Hubo un error, intente nuevamente o más tarde.'));

    mostrarPokepelota();
}

fetchpokemones();

for (i = 0; i < CANTIDAD_DE_CARTAS; i++) {
    $grid.innerHTML += (`
    
    <div class="card bg border border-5">
    <img src="static/img/pokepelota.png" alt="pokeball">
    <h2 class="card p-1 text-center pokemon-nombre justify-content-center"></h2>
    </div>
    
    `)
}

$siguiente.onclick = function (e) {
    console.log('Siguiente');

    numeroDePagina++;
    pagina += CANTIDAD_DE_CARTAS

    esconderPagina();

    fetchpokemones();

    e.preventDefault();
}

$anterior.onclick = function (e) {
    console.log('Siguiente');

    numeroDePagina--;
    pagina -= CANTIDAD_DE_CARTAS

    esconderPagina();

    fetchpokemones();

    e.preventDefault();
}