/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import {
  crearCartitas,
} from './src/ui.js';

import { CANTIDAD_DE_CARTAS } from './src/constantes.js';

import { traerPokemones } from './src/coneccionApi.js';

function inicializar() {
  crearCartitas();
  traerPokemones(CANTIDAD_DE_CARTAS, 0);
}

inicializar();
