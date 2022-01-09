/* eslint-disable import/extensions */
import { pokemonesOrden } from './src/coneccion.js';

import {
  crearCartitas,
  mostrar,
  llenarPagina,
} from './src/ui.js';

import { $pokepelota } from './src/elementos.js';

import { CANTIDAD_DE_CARTAS } from './src/constantes.js';

console.log('Pokedex con módulos');

async function inicializar() {
  mostrar($pokepelota);
  crearCartitas();
  const pokemonLista = await pokemonesOrden(CANTIDAD_DE_CARTAS, 0);
  llenarPagina(pokemonLista);
}

inicializar();
