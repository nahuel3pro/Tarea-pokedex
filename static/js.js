const $grid = document.querySelector('#mygrid');
const $pokepelota = document.querySelector('#pokepelota');
const CANTIDAD_DE_CARTAS = 12;
let numeroDePagina = 0;

const URL = 'https://pokeapi.co/api/v2/';
let pokemones = []


function esconderAnimacionPokepelota() {
    $pokepelota.classList.add('d-none');
}

function mostrarCartas() {
    $grid.classList.remove('d-none');
    document.querySelector('#barrabusqueda').classList.remove('d-none');
    document.querySelector('body').style.removeProperty('display');
    document.querySelector('body').style.removeProperty('height');
}

function animacionPokepelota() {
    $pokepelota.classList.remove('d-none');
}

function addPokemonToPage(value, index) {
    document.querySelectorAll('.pokemon-nombre')[index].innerHTML = `
    <a href="#">
    ${resultados[value].name.charAt(0).toUpperCase() + resultados[value].name.slice(1)}
    </a>
    `
}

function fetchpokemones() {
    fetch(URL + `pokemon?limit=${CANTIDAD_DE_CARTAS}&offset=${numeroDePagina}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            resultados = respuestaJSON.results;

            Object.keys(resultados).forEach((value, index) => {
                addPokemonToPage(value, index);
            })

            esconderAnimacionPokepelota();
            mostrarCartas();
        })
        .catch(() => alert('Hubo un error, intente nuevamente o más tarde.'));

    animacionPokepelota();
}

// function randomArray(array) {
//     let m = array.length, t, i;

//     while (m) {

//         i = Math.floor(Math.random() * m--);

//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }

//     return array;
// }

for (i = 0; i < CANTIDAD_DE_CARTAS; i++) {
    $grid.innerHTML += (`
    
    <div class="card bg border border-5">
        <img src="static/pokepelota.png" alt="pokeball">
        <h2 class="card p-1 text-center pokemon-nombre"></h2>
        </div>
    
    `)
}

fetchpokemones();