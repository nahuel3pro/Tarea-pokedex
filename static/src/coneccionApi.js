/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import {
  esconder,
  mostrar,
  mostrarPopup,
  manejarFlechas,
  mostrarCartasyPagina,
  addPokemonToPage,
  rellenarPopup,
  abilitarPopup,
  esconderPopup,
  cargando,
} from './ui.js';

import {
  $popup,
  $pokepelota,
} from './elementos.js';

import {
  CANTIDAD_DE_CARTAS,
  URL,
} from './constantes.js';

export async function buscarPokemon(pokemon) {
  fetch(`${URL}pokemon/${pokemon}`)
    .then((pokeAPIresponse) => pokeAPIresponse.json())
    .then((pokemonAPIresponseJSON) => {
      rellenarPopup(pokemonAPIresponseJSON);

      mostrar($popup);
      abilitarPopup();
    })
    .catch(() => {
      alert('No se pudo encontrar ese pokemon, intente nuevamente');
      esconderPopup();
      abilitarPopup();
    });

  cargando();
}

export function traerPokemones(limite, desplazamiento) {
  fetch(`${URL}pokemon?limit=${limite}&offset=${desplazamiento}`)
    .then((pokeAPIresponse) => pokeAPIresponse.json())
    .then((pokeAPIresponseJSON) => {
      const resultados = pokeAPIresponseJSON.results;

      Object.keys(resultados).forEach((value, index) => {
        addPokemonToPage(value, index, resultados);
      });

      esconder($pokepelota);
      mostrarCartasyPagina();

      manejarFlechas(desplazamiento / CANTIDAD_DE_CARTAS);
    })
    .catch(() => alert('Hubo un error, intente nuevamente o más tarde.'));

  mostrar($pokepelota);
}

export function agarrarPokemonPorNombre(pokemon) {
  fetch(`${URL}pokemon/${pokemon}`)
    .then((pokeAPIresponse) => pokeAPIresponse.json())
    .then((pokemonAPIresponseJSON) => {
      rellenarPopup(pokemonAPIresponseJSON);
      mostrar($popup);
    });
  esconder($popup);
  mostrarPopup();
}
