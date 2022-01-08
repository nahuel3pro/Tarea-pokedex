/* eslint-disable import/extensions */
import { pokemonesOrden } from './static/src/coneccion.js';

import {
  crearCartitas,
  addPokemonToPage,
  esconder,
  mostrarCartasyPagina,
  mostrar,
} from './static/src/ui.js';

import { $pokepelota } from './static/src/elementos.js';

import { CANTIDAD_DE_CARTAS } from './static/src/constantes.js';

async function inicializar() {
  mostrar($pokepelota);

  crearCartitas();

  const resultados = await pokemonesOrden(CANTIDAD_DE_CARTAS, 0);
  Object.keys(resultados).forEach((index) => {
    addPokemonToPage(index, resultados);
  });

  esconder($pokepelota);
  mostrarCartasyPagina();
}

inicializar();
