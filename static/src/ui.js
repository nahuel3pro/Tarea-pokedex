/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import * as $elementohtml from './elementos.js';
import { buscarPokemon, pokemonesOrden } from './coneccion.js';
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
  $elementohtml.$popup2.style.opacity = 1;
  $elementohtml.$popup2.style.visibility = 'visible';
}

export function esconder($elemento) {
  $elemento.classList.add('d-none');
}

export function mostrar($elemento) {
  $elemento.classList.remove('d-none');
}

export function manejarFlechas(paginaActual) {
  if (paginaActual === 0) {
    esconder($elementohtml.$inicio);
    mostrar($elementohtml.$siguiente);
    esconder($elementohtml.$anterior);
  } else {
    mostrar($elementohtml.$inicio);
    mostrar($elementohtml.$siguiente);
    mostrar($elementohtml.$anterior);
  }
}

// function prepararPopUp() {
//   esconder($elementohtml.$grid);
//   esconder($elementohtml.$anterior);
//   esconder($elementohtml.$inicio);
//   esconder($elementohtml.$siguiente);
//   mostrar($elementohtml.$pokepelota);
//   esconder($elementohtml.$popup);
//   mostrarPopup();
// }

// function abilitarPopup() {
//   esconder($elementohtml.$pokepelota);
//   mostrar($elementohtml.$grid);
// //   manejarFlechas();
// }

export function esconderPopup() {
  $elementohtml.$popup2.style.opacity = 0;
  $elementohtml.$popup2.style.visibility = 'hidden';
}

export function mostrarCartasyPagina() {
  mostrar($elementohtml.$grid);

  document.querySelector('body').style.removeProperty('display');

  mostrar($elementohtml.$barra);
  mostrar($elementohtml.$logo);
}

export function crearCartitas() {
  for (let i = 0; i < CANTIDAD_DE_CARTAS; i += 1) {
    $elementohtml.$grid.innerHTML += (`
        <div class="card bg border border-5">
            <img src="static/img/pokepelota.png" alt="pokeball">
            <h2 class="card p-1 text-center pokemon-nombre justify-content-center"></h2>
        </div>
        `);
  }
}

export function addPokemonToPage(index, resultados) {
  document.querySelectorAll('.pokemon-nombre')[index].innerHTML = `
      <a href="javascript:void(0)" data-pokemon="${resultados[index].name}" class="nombre-pokemon">
      ${resultados[index].name.charAt(0).toUpperCase() + resultados[index].name.slice(1)}
      </a>
      `;
}

export async function obtenerPokemonyMostrarlo(pokemon) {
  esconder($elementohtml.$popup);
  mostrarPopup();
  try {
    const pokemonInfo = await buscarPokemon(pokemon);

    rellenarPopup(pokemonInfo);
    mostrar($elementohtml.$popup);
  } catch (error) {
    alert('No se puede mostrar el pokemon en este momento');
    esconderPopup();
  }
}

// export async function buscarPokemonyMostrarlo(pokemon) {
//   prepararPopUp();

//   try {
//     const pokemonInfo = await buscarPokemon(pokemon);

//     rellenarPopup(pokemonInfo);
//     mostrar($elementohtml.$popup);
//   } catch (error) {
//     alert('El pokemon que se intenta buscar no existe');
//     esconderPopup();
//   }

//   abilitarPopup();
// }

export function esconderPagina() {
  esconder($elementohtml.$logo);
  esconder($elementohtml.$siguiente);
  esconder($elementohtml.$anterior);
  esconder($elementohtml.$inicio);
  esconder($elementohtml.$barra);
  esconder($elementohtml.$grid);
}

export async function actualizarPagina(pagina) {
  mostrar($elementohtml.$pokepelota);

  try {
    const pokemonLista = await pokemonesOrden(CANTIDAD_DE_CARTAS, pagina);

    Object.keys(pokemonLista).forEach((value) => {
      addPokemonToPage(value, pokemonLista);
    });

    esconder($elementohtml.$pokepelota);
    mostrarCartasyPagina();

    manejarFlechas(pagina / CANTIDAD_DE_CARTAS);
  } catch {
    alert('Hubo un error, intente nuevamente o más tarde.');
  }
}
