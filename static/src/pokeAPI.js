const URL = 'https://pokeapi.co/api/v2/';

function obtenerPokemon(pokemon) {
  return fetch(`${URL}pokemon/${pokemon}`)
    .then((r) => r.json());
}

function obtenerListaPokemones(limit, offset) {
  return fetch(`${URL}pokemon?limit=${limit}&offset=${offset}`)
    .then((r) => r.json()).then((r) => r.results);
}

// function buscarPokemon(pokemon) {
//   return obtenerPokemon(pokemon).then((r) => r.json());
// }

// function pokemonesOrden(limit, offset) {
//   return obtenerPokemones(limit, offset).then((r) => r.json()).then((r) => r.results);
// }

export { obtenerPokemon, obtenerListaPokemones };
