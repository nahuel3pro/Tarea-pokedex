import {
  $siguiente,
  $cerrar,
  $anterior,
  $barraBusqueda,
} from './elementos.js';

import {
  obtenerPokemonyMostrarlo,
  esconderPopup,
  esconderPagina,
  actualizarPagina,
  manejarFlechas,
} from './ui.js';

import { CANTIDAD_DE_CARTAS } from './constantes.js';

let pagina = 0;

$siguiente.onclick = (e) => {
  pagina += CANTIDAD_DE_CARTAS;

  esconderPagina();
  actualizarPagina(pagina);

  e.preventDefault();
};

$anterior.onclick = (e) => {
  pagina -= CANTIDAD_DE_CARTAS;

  esconderPagina();
  actualizarPagina(pagina);

  e.preventDefault();
};

document.querySelectorAll('.pokemon-nombre').forEach((value) => {
  const elementos = value;
  elementos.onclick = (e) => {
    const nombrePokemon = e.target.dataset.pokemon || e.target.lastElementChild.dataset.pokemon;
    obtenerPokemonyMostrarlo(nombrePokemon);
  };
});

$cerrar.onclick = () => {
  esconderPopup();
};

$barraBusqueda.buscar.onclick = (e) => {
  obtenerPokemonyMostrarlo($barraBusqueda.pokemon.value.toLowerCase());

  manejarFlechas(pagina / CANTIDAD_DE_CARTAS);
  e.preventDefault();
};
