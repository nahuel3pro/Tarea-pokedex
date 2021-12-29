/* eslint-disable import/extensions */
import {
  $grid,
  $pokepelota,
  $popup2,
  $siguiente,
  $anterior,
  $inicio,
  $logo,
  $barra,
  $popup,
  //   $form,
} from './elementos.js';

import { CANTIDAD_DE_CARTAS } from './constantes.js';

export function esconder($element) {
  $element.classList.add('d-none');
}

export function mostrar($element) {
  $element.classList.remove('d-none');
}

export function esconderPopup() {
  $popup2.style.opacity = 0;
  $popup2.style.visibility = 'hidden';
}

export function mostrarPopup() {
  $popup2.style.opacity = 1;
  $popup2.style.visibility = 'visible';
}

export function manejarFlechas(paginaActual) {
  if (paginaActual === 0) {
    esconder($inicio);
    mostrar($siguiente);
    esconder($anterior);
  } else {
    mostrar($inicio);
    mostrar($siguiente);
    mostrar($anterior);
  }
}

export function abilitarPopup() {
  esconder($pokepelota);
  mostrar($grid);
  manejarFlechas();
}

export function mostrarCartasyPagina() {
  mostrar($grid);

  document.querySelector('body').style.removeProperty('display');

  mostrar($barra);
  mostrar($logo);
}

export function esconderPagina() {
  esconder($logo);
  esconder($siguiente);
  esconder($anterior);
  esconder($inicio);
  esconder($barra);
  esconder($grid);
}

export function cargando() {
  esconder($grid);
  esconder($anterior);
  esconder($inicio);
  esconder($siguiente);
  mostrar($pokepelota);
  esconder($popup);
  mostrarPopup();
}

export function addPokemonToPage(valor, indice, resultados) {
  document.querySelectorAll('.pokemon-nombre')[indice].innerHTML = `
      <a href="javascript:void(0)" class="pokemon-nombre2" data-nombre=${resultados[valor].name}>
      ${resultados[valor].name.charAt(0).toUpperCase() + resultados[valor].name.slice(1)}
      </a>
      `;
}

export function rellenarPopup(pokemon) {
  document.querySelector('#pokemon-name').textContent = pokemon.forms[0].name.toUpperCase();
  document.querySelector('#pokemon-img').src = pokemon.sprites.other['official-artwork'].front_default;
  document.querySelector('#tipo').textContent = pokemon.types[0].type.name;
  document.querySelector('#vida').textContent = pokemon.stats[0].base_stat;
  document.querySelector('#ataque').textContent = pokemon.stats[1].base_stat;
  document.querySelector('#defensa').textContent = pokemon.stats[2].base_stat;
}

export function crearCartitas() {
  for (let i = 0; i < CANTIDAD_DE_CARTAS; i += 1) {
    $grid.innerHTML += (`
          
          <div class="card bg border border-5">
              <img src="static/img/pokepelota.png" alt="pokeball">
              <h2 class="card p-1 text-center pokemon-nombre justify-content-center"></h2>
          </div>
          
          `);
  }
}
