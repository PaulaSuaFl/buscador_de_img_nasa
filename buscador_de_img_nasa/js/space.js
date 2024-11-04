// Selecciona el input y el botón
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Función para realizar la búsqueda en la API de NASA
const buscarImagenes = async () => {
  const searchTerm = inputBuscar.value.trim(); // Término de búsqueda

  // Validación simple de entrada
  if (!searchTerm) {
    alert("Por favor, ingresa un término de búsqueda.");
    return;
  }

  try {
    // Realiza la solicitud a la API de NASA
    const response = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`);
    if (!response.ok) throw new Error("Error al obtener datos de la API");

    const data = await response.json();
    const results = data.collection.items; // Resultados de la API

    // Limpia el contenedor antes de agregar nuevos resultados
    contenedor.innerHTML = '';

    // Itera sobre los resultados y muestra cada imagen con su información
    results.forEach((item) => {
      const { data, links } = item;
      const { title, description, date_created } = data[0];
      const imageUrl = links ? links[0].href : '';

      // Crea elementos HTML para cada imagen
      const div = document.createElement('div');
      div.classList.add('result-item', 'col-md-4', 'mb-4');

      div.innerHTML = `
        <div class="card">
          <img src="${imageUrl}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description || 'Sin descripción disponible'}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
          </div>
        </div>
      `;

      contenedor.appendChild(div); // Agrega el resultado al contenedor
    });

    // Mensaje si no hay resultados
    if (results.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    }

  } catch (error) {
    // Muestra un mensaje de error en caso de fallo
    contenedor.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
};

// Escucha el evento 'click' del botón de búsqueda
btnBuscar.addEventListener('click', buscarImagenes);

