const movies = [
  {
    id: "starlight-odyssey",
    title: "Starlight Odyssey",
    year: 2024,
    rating: 8.6,
    runtime: 132,
    genres: ["Sci-Fi", "Adventure"],
    director: "Rina Okoro",
    cast: ["Avery Cole", "Liam Park", "Sana Patel"],
    description:
      "A deep space navigator finds an ancient signal that could rewrite human history.",
    consensus: "Big visuals with a surprising emotional core.",
    featured: true,
    trending: true,
  },
  {
    id: "harbor-lights",
    title: "Harbor Lights",
    year: 2023,
    rating: 7.9,
    runtime: 118,
    genres: ["Drama", "Romance"],
    director: "Miguel Torres",
    cast: ["Keira Lin", "Jonas Reed", "Amara Blake"],
    description:
      "A harbor town chef and a traveling journalist uncover the town's hidden past.",
    consensus: "Warm, character-driven storytelling.",
    featured: true,
    trending: false,
  },
  {
    id: "quantum-heist",
    title: "Quantum Heist",
    year: 2025,
    rating: 8.2,
    runtime: 126,
    genres: ["Action", "Thriller"],
    director: "Noah Grant",
    cast: ["Zara Novak", "Theo Banks", "Ishaan Roy"],
    description:
      "A crew of specialists uses time windows to pull off an impossible vault break.",
    consensus: "Fast, slick, and packed with twists.",
    featured: true,
    trending: true,
  },
  {
    id: "crimson-moon",
    title: "Crimson Moon",
    year: 2022,
    rating: 8.9,
    runtime: 142,
    genres: ["Fantasy", "Adventure"],
    director: "Sofia Karim",
    cast: ["Hana Lee", "Carter Miles", "Priya Desai"],
    description:
      "A reluctant guardian must protect a mythical map across war-torn kingdoms.",
    consensus: "An epic fantasy with heart and spectacle.",
    featured: true,
    trending: true,
  },
  {
    id: "signal-9",
    title: "Signal 9",
    year: 2021,
    rating: 7.6,
    runtime: 109,
    genres: ["Mystery", "Sci-Fi"],
    director: "Jun Park",
    cast: ["Ellis Monroe", "Yara Patel", "Omar Youssef"],
    description:
      "A radio host receives transmissions from a place that should not exist.",
    consensus: "Moody and cerebral, with a killer finale.",
    featured: false,
    trending: true,
  },
  {
    id: "iron-avenue",
    title: "Iron Avenue",
    year: 2020,
    rating: 7.4,
    runtime: 124,
    genres: ["Crime", "Drama"],
    director: "Lila Hughes",
    cast: ["Marcus Hill", "Nina Santos", "Owen Brooks"],
    description:
      "A detective returns to his old neighborhood just as a new syndicate rises.",
    consensus: "A gritty noir with a modern edge.",
    featured: false,
    trending: false,
  },
  {
    id: "solar-runner",
    title: "Solar Runner",
    year: 2024,
    rating: 8.1,
    runtime: 115,
    genres: ["Action", "Sci-Fi"],
    director: "Jules Ortega",
    cast: ["Diana Park", "Leo Mitchell", "Sage Wright"],
    description:
      "A courier races across a solar system on the brink of collapse.",
    consensus: "Relentless pace and a thrilling soundtrack.",
    featured: true,
    trending: true,
  },
  {
    id: "echoes-of-summer",
    title: "Echoes of Summer",
    year: 2019,
    rating: 8.3,
    runtime: 121,
    genres: ["Drama"],
    director: "Elena Cruz",
    cast: ["Sienna Hart", "Caleb Stone", "Maya Rivera"],
    description:
      "Two estranged siblings revisit their childhood home and uncover a family secret.",
    consensus: "A heartfelt drama with stunning performances.",
    featured: false,
    trending: false,
  },
  {
    id: "neon-market",
    title: "Neon Market",
    year: 2025,
    rating: 7.8,
    runtime: 111,
    genres: ["Comedy", "Adventure"],
    director: "Harper Nguyen",
    cast: ["Miles Kim", "Talia Brooks", "Rafael Cruz"],
    description:
      "A group of friends opens a night market only to stumble into a culinary mystery.",
    consensus: "Quirky, bright, and full of heart.",
    featured: false,
    trending: true,
  },
  {
    id: "northwind",
    title: "Northwind",
    year: 2023,
    rating: 9.1,
    runtime: 138,
    genres: ["Drama", "History"],
    director: "Grace Olsson",
    cast: ["Elliot Kane", "Lana Ford", "Mira Volkov"],
    description:
      "An arctic expedition chronicles survival, sacrifice, and scientific discovery.",
    consensus: "A masterful historical drama with breathtaking visuals.",
    featured: true,
    trending: false,
  },
  {
    id: "pulse-city",
    title: "Pulse City",
    year: 2022,
    rating: 7.7,
    runtime: 104,
    genres: ["Thriller", "Crime"],
    director: "Ari Singh",
    cast: ["Jordan Hale", "Nora Bell", "Lucian Fox"],
    description:
      "An investigative reporter uncovers a conspiracy in the city's energy grid.",
    consensus: "Tense and stylish with sharp twists.",
    featured: false,
    trending: true,
  },
  {
    id: "golden-interval",
    title: "Golden Interval",
    year: 2021,
    rating: 8.0,
    runtime: 117,
    genres: ["Drama", "Music"],
    director: "Samir Iqbal",
    cast: ["Riley Stone", "Nova James", "Camila Trent"],
    description:
      "A touring band fights to finish its final album after a sudden breakup.",
    consensus: "Sweeping music sequences and honest drama.",
    featured: false,
    trending: false,
  },
];

const state = {
  query: "",
  genre: "all",
  minRating: 0,
  sortBy: "featured",
  watchlist: new Set(),
};

const elements = {
  featuredGrid: document.getElementById("featuredGrid"),
  trendingRow: document.getElementById("trendingRow"),
  topRatedList: document.getElementById("topRatedList"),
  watchlistGrid: document.getElementById("watchlistGrid"),
  resultsCount: document.getElementById("resultsCount"),
  searchInput: document.getElementById("searchInput"),
  clearSearch: document.getElementById("clearSearch"),
  genreFilter: document.getElementById("genreFilter"),
  minRating: document.getElementById("minRating"),
  sortBy: document.getElementById("sortBy"),
  heroTitle: document.getElementById("heroTitle"),
  heroMeta: document.getElementById("heroMeta"),
  heroDescription: document.getElementById("heroDescription"),
  heroPoster: document.getElementById("heroPoster"),
  heroStats: document.getElementById("heroStats"),
  heroTagline: document.getElementById("heroTagline"),
  heroCast: document.getElementById("heroCast"),
  heroWatchlist: document.getElementById("heroWatchlist"),
  playTrailer: document.getElementById("playTrailer"),
  detailsDialog: document.getElementById("detailsDialog"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogContent: document.getElementById("dialogContent"),
  closeDialog: document.getElementById("closeDialog"),
};

function loadWatchlist() {
  const raw = localStorage.getItem("cinebase-watchlist");
  if (!raw) {
    return;
  }
  try {
    const ids = JSON.parse(raw);
    if (Array.isArray(ids)) {
      ids.forEach((id) => state.watchlist.add(id));
    }
  } catch (error) {
    console.warn("Failed to load watchlist", error);
  }
}

function saveWatchlist() {
  localStorage.setItem(
    "cinebase-watchlist",
    JSON.stringify(Array.from(state.watchlist)),
  );
}

function formatRuntime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

function toSearchText(movie) {
  return [
    movie.title,
    movie.director,
    movie.description,
    movie.consensus,
    movie.cast.join(" "),
    movie.genres.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

function getFilteredMovies() {
  const query = state.query.trim().toLowerCase();
  return movies.filter((movie) => {
    if (state.genre !== "all" && !movie.genres.includes(state.genre)) {
      return false;
    }
    if (movie.rating < state.minRating) {
      return false;
    }
    if (!query) {
      return true;
    }
    return toSearchText(movie).includes(query);
  });
}

function sortMovies(list) {
  const sorted = [...list];
  if (state.sortBy === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === "year") {
    sorted.sort((a, b) => b.year - a.year);
  } else if (state.sortBy === "runtime") {
    sorted.sort((a, b) => b.runtime - a.runtime);
  } else {
    sorted.sort((a, b) => {
      const featuredScore = Number(b.featured) - Number(a.featured);
      return featuredScore || b.rating - a.rating;
    });
  }
  return sorted;
}

function buildPoster(title, id) {
  const hue = Math.abs(hashCode(id)) % 360;
  const poster = document.createElement("div");
  poster.className = "poster";
  poster.style.background = `linear-gradient(135deg, hsl(${hue}, 38%, 34%), hsl(${hue}, 44%, 18%))`;
  poster.innerHTML = `<span>${title}</span>`;
  return poster;
}

function hashCode(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function buildCard(movie, context = "featured") {
  const card = document.createElement("article");
  card.className = "movie-card";

  const poster = buildPoster(movie.title, movie.id);
  card.appendChild(poster);

  const titleRow = document.createElement("div");
  titleRow.className = "card-title";
  titleRow.innerHTML = `<h3>${movie.title}</h3><span class="rating">${movie.rating.toFixed(1)}</span>`;
  card.appendChild(titleRow);

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${movie.year} | ${formatRuntime(movie.runtime)} | ${movie.genres.join(", ")}`;
  card.appendChild(meta);

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = movie.description;
  card.appendChild(summary);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const watchlistButton = document.createElement("button");
  watchlistButton.type = "button";
  watchlistButton.dataset.id = movie.id;
  watchlistButton.className = "watchlist";
  const inWatchlist = state.watchlist.has(movie.id);
  if (context === "watchlist") {
    watchlistButton.textContent = "Remove";
    watchlistButton.classList.add("watchlist-added");
  } else {
    watchlistButton.textContent = inWatchlist ? "Added" : "Add to watchlist";
    if (inWatchlist) {
      watchlistButton.classList.add("watchlist-added");
    }
  }
  actions.appendChild(watchlistButton);

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.dataset.details = movie.id;
  detailsButton.className = "details";
  detailsButton.textContent = "Details";
  actions.appendChild(detailsButton);

  card.appendChild(actions);
  return card;
}

function renderFeatured() {
  const filtered = sortMovies(getFilteredMovies());
  elements.resultsCount.textContent = String(filtered.length);
  elements.featuredGrid.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No titles match your filters.";
    elements.featuredGrid.appendChild(empty);
    return;
  }

  filtered.forEach((movie) => {
    elements.featuredGrid.appendChild(buildCard(movie));
  });
}

function renderTopRated() {
  const list = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);
  elements.topRatedList.innerHTML = "";
  list.forEach((movie) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div>
        <strong>${movie.title}</strong>
        <div class="list-meta">
          <span>${movie.year}</span>
          <span>${movie.genres.join(", ")}</span>
          <span>${formatRuntime(movie.runtime)}</span>
        </div>
      </div>
      <span class="rating">${movie.rating.toFixed(1)}</span>
    `;
    elements.topRatedList.appendChild(item);
  });
}

function renderTrending() {
  const list = movies.filter((movie) => movie.trending).slice(0, 8);
  elements.trendingRow.innerHTML = "";
  list.forEach((movie) => {
    elements.trendingRow.appendChild(buildCard(movie));
  });
}

function renderWatchlist() {
  const list = movies.filter((movie) => state.watchlist.has(movie.id));
  elements.watchlistGrid.innerHTML = "";
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Your watchlist is empty. Add some movies.";
    elements.watchlistGrid.appendChild(empty);
    return;
  }
  list.forEach((movie) => {
    elements.watchlistGrid.appendChild(buildCard(movie, "watchlist"));
  });
}

function setHero() {
  const heroMovie =
    movies.find((movie) => movie.featured && movie.trending) ||
    movies.find((movie) => movie.featured) ||
    movies[0];

  if (!heroMovie) {
    return;
  }

  elements.heroTitle.textContent = heroMovie.title;
  elements.heroMeta.textContent = `${heroMovie.year} | ${formatRuntime(heroMovie.runtime)} | ${heroMovie.genres.join(", ")}`;
  elements.heroDescription.textContent = heroMovie.description;
  elements.heroCast.textContent = `Cast: ${heroMovie.cast.join(", ")}`;
  elements.heroTagline.textContent = heroMovie.consensus;
  elements.heroPoster.innerHTML = `<span>${heroMovie.title}</span>`;
  elements.heroPoster.style.background = buildPoster(
    heroMovie.title,
    heroMovie.id,
  ).style.background;
  elements.heroStats.innerHTML = `
    <div class="stat">
      <strong>${heroMovie.rating.toFixed(1)}</strong>
      <span>Viewer rating</span>
    </div>
    <div class="stat">
      <strong>${heroMovie.director}</strong>
      <span>Director</span>
    </div>
    <div class="stat">
      <strong>${heroMovie.trending ? "Trending" : "Editor pick"}</strong>
      <span>Status</span>
    </div>
  `;
  elements.heroWatchlist.dataset.id = heroMovie.id;
  updateHeroWatchlistButton(heroMovie.id);
}

function updateHeroWatchlistButton(id) {
  const inWatchlist = state.watchlist.has(id);
  elements.heroWatchlist.textContent = inWatchlist
    ? "In watchlist"
    : "Add to watchlist";
  elements.heroWatchlist.classList.toggle("watchlist-added", inWatchlist);
}

function toggleWatchlist(id) {
  if (state.watchlist.has(id)) {
    state.watchlist.delete(id);
  } else {
    state.watchlist.add(id);
  }
  saveWatchlist();
  renderFeatured();
  renderTrending();
  renderWatchlist();
  updateHeroWatchlistButton(elements.heroWatchlist.dataset.id);
}

function openDetails(id) {
  const movie = movies.find((item) => item.id === id);
  if (!movie) {
    return;
  }
  elements.dialogTitle.textContent = movie.title;
  elements.dialogContent.innerHTML = `
    <p><strong>Year:</strong> ${movie.year}</p>
    <p><strong>Runtime:</strong> ${formatRuntime(movie.runtime)}</p>
    <p><strong>Genres:</strong> ${movie.genres.join(", ")}</p>
    <p><strong>Director:</strong> ${movie.director}</p>
    <p><strong>Cast:</strong> ${movie.cast.join(", ")}</p>
    <p><strong>Summary:</strong> ${movie.description}</p>
    <p><strong>Consensus:</strong> ${movie.consensus}</p>
  `;

  if (typeof elements.detailsDialog.showModal === "function") {
    elements.detailsDialog.showModal();
  } else {
    alert(`${movie.title}\n${movie.description}`);
  }
}

function openTrailer() {
  elements.dialogTitle.textContent = "Trailer";
  elements.dialogContent.innerHTML =
    "<p>Trailer playback is not available in this demo.</p>";
  if (typeof elements.detailsDialog.showModal === "function") {
    elements.detailsDialog.showModal();
  } else {
    alert("Trailer playback is not available in this demo.");
  }
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderFeatured();
  });

  elements.clearSearch.addEventListener("click", () => {
    state.query = "";
    elements.searchInput.value = "";
    renderFeatured();
  });

  elements.genreFilter.addEventListener("change", (event) => {
    state.genre = event.target.value;
    renderFeatured();
  });

  elements.minRating.addEventListener("change", (event) => {
    state.minRating = Number(event.target.value);
    renderFeatured();
  });

  elements.sortBy.addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    renderFeatured();
  });

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const watchId = target.dataset.id;
    if (watchId && target.classList.contains("watchlist")) {
      toggleWatchlist(watchId);
      return;
    }
    const detailsId = target.dataset.details;
    if (detailsId) {
      openDetails(detailsId);
    }
  });

  elements.closeDialog.addEventListener("click", () => {
    elements.detailsDialog.close();
  });

  elements.detailsDialog.addEventListener("click", (event) => {
    if (event.target === elements.detailsDialog) {
      elements.detailsDialog.close();
    }
  });

  elements.heroWatchlist.addEventListener("click", (event) => {
    const id = event.currentTarget.dataset.id;
    if (id) {
      toggleWatchlist(id);
    }
  });

  elements.playTrailer.addEventListener("click", () => {
    openTrailer();
  });
}

function populateGenreFilter() {
  const genres = new Set();
  movies.forEach((movie) => movie.genres.forEach((genre) => genres.add(genre)));
  const sorted = Array.from(genres).sort();
  elements.genreFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All genres";
  elements.genreFilter.appendChild(allOption);

  sorted.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    elements.genreFilter.appendChild(option);
  });
}

function init() {
  loadWatchlist();
  populateGenreFilter();
  setHero();
  renderFeatured();
  renderTrending();
  renderTopRated();
  renderWatchlist();
  bindEvents();
}

init();
