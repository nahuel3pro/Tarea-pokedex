/* eslint-disable import/extensions */
import { pokemonesOrden } from './src/coneccion.js';

import {
  crearCartitas,
  addPokemonToPage,
  esconder,
  mostrarCartasyPagina,
  mostrar,
} from './src/ui.js';

import { $pokepelota } from './src/elementos.js';

import { CANTIDAD_DE_CARTAS } from './src/constantes.js';

console.log('Pokedex con módulos');

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
