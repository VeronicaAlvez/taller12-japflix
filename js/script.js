const API_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let movies = [];

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    movies = data; // estos son los datos que vienen de la API
  });

//boton de busqueda
document.getElementById("btnBuscar").addEventListener("click", () => {
  const query = document.getElementById("inputBuscar").value.toLowerCase();
  const resultsDiv = document.getElementById("lista");
  resultsDiv.innerHTML = ""; // limpiar resultados previos

  const filtered = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.genres.join(" ").toLowerCase().includes(query) ||
      (movie.tagline && movie.tagline.toLowerCase().includes(query)) ||
      (movie.overview && movie.overview.toLowerCase().includes(query))
  );

  //mostrar resultados
  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron resultados</p>";
    return;
  }


   filtered.forEach((movie) => {
    const stars = getStars(movie.vote_average); // usamos la función de estrellas
    resultsDiv.innerHTML += `
      <li class="list-group-item bg-dark text-white">
        <h5>${movie.title}</h5>
        <p><em>${movie.tagline || "Sin tagline"}</em></p>
        <p>${stars}</p>
      </li>
    `;
  });
});


// Función para mostrar estrellas en base al voto promedio 
function getStars(vote) {
  const starsTotal = 5;
  const rating = Math.round(vote / 2); // como vote_average va de 0 a 10
  let stars = "";

  for (let i = 0; i < starsTotal; i++) {
    if (i < rating) {
      stars += `<i class="fa fa-star text-warning"></i>`;
    } else {
      stars += `<i class="fa fa-star-o text-warning"></i>`;
    }
  }
  return stars;
}

