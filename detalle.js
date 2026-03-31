const contenedor = document.getElementById("detalle-pokemon");

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

async function cargarDetallePokemon() {
  const params = new URLSearchParams(window.location.search);
  const nombrePokemon = params.get("name");

  if (!nombrePokemon) {
    contenedor.innerHTML = `
      <p class="error">No se ha indicado ningún Pokémon en la URL.</p>
    `;
    return;
  }

  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombrePokemon)}`
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener el detalle del Pokémon");
    }

    const datos = await respuesta.json();

    const tipos = datos.types
      .map((tipo) => `<span class="tag">${capitalizar(tipo.type.name)}</span>`)
      .join("");

    const imagenPokemon =
      datos.sprites.other?.["official-artwork"]?.front_default ||
      datos.sprites.front_default ||
      "";

    contenedor.innerHTML = `
      <h2>${capitalizar(datos.name)}</h2>
      ${
        imagenPokemon
          ? `<img src="${imagenPokemon}" alt="${datos.name}">`
          : `<p>Imagen no disponible</p>`
      }
      <p><strong>ID:</strong> ${datos.id}</p>
      <p><strong>Altura:</strong> ${datos.height}</p>
      <p><strong>Peso:</strong> ${datos.weight}</p>
      <p><strong>Experiencia base:</strong> ${datos.base_experience}</p>
      <div class="tags">
        ${tipos}
      </div>
    `;
  } catch (error) {
    contenedor.innerHTML = `
      <p class="error">Error: ${error.message}</p>
    `;
  }
}

cargarDetallePokemon();
