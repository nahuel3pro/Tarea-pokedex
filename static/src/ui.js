import * as $elementoHtml from './elementos.js';
import { obtenerPokemon, obtenerListaPokemones } from './pokeAPIconeccion.js';
import { CANTIDAD_DE_CARTAS } from './constantes.js';

function rellenarPopup(pokemon) {
  document.querySelector('#pokemon-name').textContent = pokemon.forms[0].name.toUpperCase();
  document.querySelector('#pokemon-img').src = pokemon.sprites.other['official-artwork'].front_default;
  document.querySelector('#tipo').textContent = pokemon.types[0].type.name;
  document.querySelector('#vida').textContent = pokemon.stats[0].base_stat;
  document.querySelector('#ataque').textContent = pokemon.stats[1].base_stat;
  document.querySelector('#defensa').textContent = pokemon.stats[2].base_stat;
}

function mostrarPopup() {
  $elementoHtml.$fondoNegro.style.opacity = 1;
  $elementoHtml.$fondoNegro.style.visibility = 'visible';
}

export function esconder($elemento) {
  $elemento.classList.add('d-none');
}

export function mostrar($elemento) {
  $elemento.classList.remove('d-none');
}

export function manejarFlechas(paginaActual) {
  if (paginaActual === 0) {
    esconder($elementoHtml.$inicio);
    mostrar($elementoHtml.$siguiente);
    esconder($elementoHtml.$anterior);
  } else {
    mostrar($elementoHtml.$inicio);
    mostrar($elementoHtml.$siguiente);
    mostrar($elementoHtml.$anterior);
  }
}

export function esconderPopup() {
  $elementoHtml.$fondoNegro.style.opacity = 0;
  $elementoHtml.$fondoNegro.style.visibility = 'hidden';
}

export function mostrarCartasyPagina() {
  mostrar($elementoHtml.$grid);

  document.querySelector('body').style.removeProperty('display');

  mostrar($elementoHtml.$barraBusqueda);
  mostrar($elementoHtml.$logo);
}

export function crearCartitas() {
  for (let i = 0; i < CANTIDAD_DE_CARTAS; i += 1) {
    $elementoHtml.$grid.innerHTML += (`
        <div class="card bg border border-5">
            <img src="static/img/pokepelota.png" alt="pokeball">
            <h2 class="card p-1 text-center pokemon-nombre justify-content-center"></h2>
        </div>
        `);
  }
}

function añadirPokemonAPagina(index, resultados) {
  document.querySelectorAll('.pokemon-nombre')[index].innerHTML = `
      <a href="javascript:void(0)" data-pokemon="${resultados[index].name}" class="nombre-pokemon">
      ${resultados[index].name.charAt(0).toUpperCase() + resultados[index].name.slice(1)}
      </a>
      `;
}

export async function obtenerPokemonyMostrarlo(pokemon) {
  esconder($elementoHtml.$popup);
  mostrarPopup();
  try {
    const pokemonInfo = await obtenerPokemon(pokemon);

    rellenarPopup(pokemonInfo);
    mostrar($elementoHtml.$popup);
  } catch (error) {
    alert('No se puede mostrar el pokemon en este momento');
    esconderPopup();
  }
}

export function esconderPagina() {
  esconder($elementoHtml.$logo);
  esconder($elementoHtml.$siguiente);
  esconder($elementoHtml.$anterior);
  esconder($elementoHtml.$inicio);
  esconder($elementoHtml.$barraBusqueda);
  esconder($elementoHtml.$grid);
}

export function llenarPagina(pokelista) {
  Object.keys(pokelista).forEach((index) => {
    añadirPokemonAPagina(index, pokelista);
  });

  esconder($elementoHtml.$pokepelota);
  mostrarCartasyPagina();
}

export async function actualizarPagina(pagina) {
  mostrar($elementoHtml.$pokepelota);

  try {
    const pokemonLista = await obtenerListaPokemones(CANTIDAD_DE_CARTAS, pagina);

    llenarPagina(pokemonLista);

    manejarFlechas(pagina / CANTIDAD_DE_CARTAS);
  } catch {
    alert('Hubo un error, intente nuevamente o más tarde.');
  }
}
