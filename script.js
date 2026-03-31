const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=30";
const lista = document.getElementById("lista-pokemon");
const estado = document.getElementById("estado");
const buscador = document.getElementById("buscador");
const btnRecargar = document.getElementById("btn-recargar");

let pokemonOriginal = [];

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function pintarPokemon(pokemon) {
  lista.innerHTML = "";

  if (pokemon.length === 0) {
    lista.innerHTML = `<li class="card">No se han encontrado resultados.</li>`;
    return;
  }

  pokemon.forEach((item, index) => {
    lista.innerHTML += `
      <li class="card">
        <a href="detalle.html?name=${encodeURIComponent(item.name)}">
          ${capitalizar(item.name)}
        </a>
        <small>Pokémon #${index + 1}</small>
      </li>
    `;
  });
}

async function cargarPokemon() {
  estado.textContent = "Cargando Pokémon...";
  lista.innerHTML = "";

  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la lista de Pokémon");
    }

    const datos = await respuesta.json();
    pokemonOriginal = datos.results;
    pintarPokemon(pokemonOriginal);
    estado.textContent = `Se han cargado ${pokemonOriginal.length} Pokémon.`;
  } catch (error) {
    estado.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

buscador.addEventListener("input", (event) => {
  const texto = event.target.value.toLowerCase().trim();

  const filtrados = pokemonOriginal.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(texto)
  );

  pintarPokemon(filtrados);
});

btnRecargar.addEventListener("click", cargarPokemon);

cargarPokemon();
