/* eslint-disable import/extensions */
import { $form, $siguiente, $anterior } from './elementos.js';
import { esconderPagina, esconderPopup, manejarFlechas } from './ui.js';
import { agarrarPokemonPorNombre, traerPokemones, buscarPokemon } from './coneccionApi.js';
import { CANTIDAD_DE_CARTAS } from './constantes.js';

let pagina = 0;

$siguiente.onclick = (e) => {
  pagina += CANTIDAD_DE_CARTAS;

  esconderPagina();
  traerPokemones(CANTIDAD_DE_CARTAS, pagina);

  e.preventDefault();
};

$anterior.onclick = (e) => {
  pagina -= CANTIDAD_DE_CARTAS;

  esconderPagina();
  traerPokemones(CANTIDAD_DE_CARTAS, pagina);

  e.preventDefault();
};

document.querySelectorAll('.pokemon-nombre').forEach((value) => {
  const elementos = value;
  elementos.onclick = (e) => {
    let pokemon = e.currentTarget.textContent.replace(/\s/g, '');
    pokemon = pokemon.toLowerCase();

    agarrarPokemonPorNombre(pokemon);
  };
});

document.querySelector('#close').onclick = () => {
  esconderPopup();
  manejarFlechas(pagina);
};

$form.buscar.onclick = (e) => {
  buscarPokemon($form.pokemon.value.toLowerCase());

  e.preventDefault();
};
