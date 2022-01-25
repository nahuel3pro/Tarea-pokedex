import { obtenerListaPokemones } from './pokeAPI.js';

import {
  crearCartitas,
  mostrar,
  llenarPagina,
} from './ui.js';

import { $pokepelota } from './elementos.js';

import { CANTIDAD_DE_CARTAS } from './constantes.js';

async function inicializar() {
  mostrar($pokepelota);
  crearCartitas();
  const pokemonLista = await obtenerListaPokemones(CANTIDAD_DE_CARTAS, 0);
  llenarPagina(pokemonLista);
}

inicializar();
