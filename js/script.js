const API_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let movies = [];

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    movies = data; // estos son los datos que vienen de la API
  });

//boton de busqueda
document.getElementById("btnBuscar").addEventListener("click", () => {
  const query = document.getElementById("btnBuscar").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
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
    const stars = getStars(movie.vote_average);
    resultsDiv.innerHTML += `
      <div class="card mb-3 p-3">
        <h5>${movie.title}</h5>
        <p><em>${movie.tagline || "Sin tagline"}</em></p>
        <p>${stars}</p>
      </div>
    `;
  });
});
