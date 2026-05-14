/* =========================
   🌎 DOM ELEMENTS
========================= */

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const songList = document.querySelector("#songs-list");
const resultsMessage = document.querySelector("#results-message");
const favoriteList = document.querySelector("#favorites-list");
const sortSelect = document.querySelector("#sort-select");
const favoritesSection = document.querySelector(".favorites-section");
const favoriteLink = document.querySelector("#favorites-link");
const viewAllBtn = document.querySelector("#view-all-btn");
const playerText = document.querySelector(".player__empty");
const clearBtn = document.querySelector("#clear-btn");
const loader = document.querySelector("#loader");

/* =========================
   🌎 GLOBAL STATE
========================= */

let currentSongs = [];
let displayedSongs = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let showAllSongs = false;
let currentSearch = "";

/* =========================
   🛠️ HELPER FUNCTIONS
========================= */

const getLargeArtwork = (artworkUrl) => {
  return artworkUrl.replace("100x100", "600x600");
};

const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

/* =========================
   🎵 SONG CARD TEMPLATE
========================= */

const songCard = (song, isFavorite = false) => {
  return `
    <div class="song-card">
      <img
        src="${getLargeArtwork(song.artworkUrl100)}"
        alt="${song.trackName}"
        class="song-card__image"
      />

      <div class="song-card__content">
        <h3>${song.trackName}</h3>

        <p>${song.artistName}</p>

        <p>${song.collectionName}</p>

        <button
          class="${isFavorite ? "remove-btn" : "favorite-btn"}"
          data-track-id="${song.trackId}"
        >
          ${isFavorite ? "❌ Remove" : "💜 Favorite"}
        </button>

        <audio
          controls
          data-title="${song.trackName}"
          data-artist="${song.artistName}"
        >
          <source
            src="${song.previewUrl}"
            type="audio/mpeg"
          >
        </audio>

        <div class="song-card__links">
          <a
            href="${song.trackViewUrl}"
            target="_blank"
            class="listen-btn"
          >
            <i class="fa-brands fa-apple"></i>
            Apple Music
          </a>

          <a
            href="https://open.spotify.com/search/${song.artistName} ${song.trackName}"
            target="_blank"
            class="spotify-btn"
          >
            <i class="fa-brands fa-spotify"></i>
            Spotify
          </a>
        </div>
      </div>
    </div>
  `;
};

/* =========================
   🎨 RENDER FUNCTIONS
========================= */

const renderSongs = () => {
  const songsToRender = showAllSongs
    ? displayedSongs
    : displayedSongs.slice(0, 6);

  songList.innerHTML = songsToRender.map((song) => songCard(song)).join("");

  if (displayedSongs.length > 0) {
    resultsMessage.textContent = `Showing ${songsToRender.length} of ${displayedSongs.length} results for "${currentSearch}"`;
  }
};

const renderFavorites = () => {
  if (favorites.length === 0) {
    favoriteList.innerHTML = `
      <p class="empty-message">
        No favorites yet. Add some songs you love 💜
      </p>
    `;

    return;
  }

  favoriteList.innerHTML = favorites
    .map((song) => songCard(song, true))
    .join("");
};

const updateFavoritesCount = () => {
  favoriteLink.textContent = `Favorites (${favorites.length})`;
};

/* =========================
   🔎 SEARCH FUNCTIONS
========================= */

async function handleSearch(event) {
  event.preventDefault();

  const searchValue = searchInput.value.trim();

  currentSearch = searchValue;

  if (searchValue === "") {
    resultsMessage.textContent = "Please enter a song or artist.";
    return;
  }

  resultsMessage.textContent = "Tuning the vibes...";
  viewAllBtn.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${searchValue}&entity=song`,
    );

    const data = await response.json();

    currentSongs = data.results;
    displayedSongs = [...data.results];

    if (displayedSongs.length === 0) {
      resultsMessage.textContent = `No songs found for "${searchValue}" 🎵`;
      songList.innerHTML = "";
      viewAllBtn.classList.add("hidden");
      loader.classList.add("hidden");
      return;
    }

    showAllSongs = false;
    viewAllBtn.textContent = "View All";

    if (displayedSongs.length > 6) {
      viewAllBtn.classList.remove("hidden");
    } else {
      viewAllBtn.classList.add("hidden");
    }

    renderSongs();
    loader.classList.add("hidden");
  } catch (error) {
    resultsMessage.textContent = "The beat dropped... but the API didn't.";
    loader.classList.add("hidden");
    console.log(error);
  }
}

/* =========================
   💜 FAVORITES FUNCTIONS
========================= */

function handleFavoriteClick(event) {
  if (!event.target.classList.contains("favorite-btn")) {
    return;
  }

  const trackId = event.target.dataset.trackId;

  const selectedSong = currentSongs.find((song) => song.trackId == trackId);

  const alreadyFavorited = favorites.some((song) => song.trackId == trackId);

  if (alreadyFavorited) {
    return;
  }

  favorites.push(selectedSong);

  saveFavorites();
  renderFavorites();
  updateFavoritesCount();
}

function handleRemoveFavorite(event) {
  if (!event.target.classList.contains("remove-btn")) {
    return;
  }

  const trackId = event.target.dataset.trackId;

  favorites = favorites.filter((song) => song.trackId != trackId);

  saveFavorites();
  renderFavorites();
  updateFavoritesCount();
}

function toggleFavorites() {
  favoritesSection.classList.toggle("active");
}

/* =========================
   🎛️ SORTING FUNCTIONS
========================= */

function handleSort(event) {
  const sortValue = event.target.value;

  if (sortValue === "a-z") {
    displayedSongs.sort((a, b) => a.trackName.localeCompare(b.trackName));
  }

  if (sortValue === "z-a") {
    displayedSongs.sort((a, b) => b.trackName.localeCompare(a.trackName));
  }

  renderSongs();
}

/* =========================
   👀 VIEW ALL FUNCTIONS
========================= */

function handleViewAll() {
  showAllSongs = !showAllSongs;

  renderSongs();

  viewAllBtn.textContent = showAllSongs ? "Show Less" : "View All";
}

/* =========================
   🧹 CLEAR SEARCH FUNCTIONS
========================= */

function handleClearSearch() {
  searchInput.value = "";
  clearBtn.classList.add("inactive");

  songList.innerHTML = "";
  displayedSongs = [];
  currentSongs = [];
  showAllSongs = false;
  currentSearch = "";

  resultsMessage.textContent = "Search for a song to get started.";

  viewAllBtn.classList.add("hidden");
  viewAllBtn.textContent = "View All";

  sortSelect.value = "default";
}

/* =========================
   🎧 NOW PLAYING FUNCTIONS
========================= */

function handleNowPlaying(event) {
  if (event.target.tagName !== "AUDIO") {
    return;
  }

  const currentAudio = event.target;
  const allAudios = document.querySelectorAll("audio");

  allAudios.forEach((audio) => {
    if (audio !== currentAudio) {
      audio.pause();
    }
  });

  document.querySelectorAll(".song-card").forEach((card) => {
    card.classList.remove("playing");
  });

  currentAudio.closest(".song-card").classList.add("playing");

  const title = event.target.dataset.title;
  const artist = event.target.dataset.artist;

  playerText.textContent = `Now Playing: ${title} — ${artist} 💜`;
  document.querySelector(".player").classList.add("active-player");

  currentAudio.addEventListener("ended", () => {
    currentAudio.closest(".song-card").classList.remove("playing");

    document.querySelector(".player").classList.remove("active-player");

    playerText.textContent = "No song playing yet.";
  });
}

/* =========================
   ✨ INPUT / UI FUNCTIONS
========================= */

function handleInputChange() {
  if (searchInput.value.trim() === "") {
    clearBtn.classList.add("inactive");
  } else {
    clearBtn.classList.remove("inactive");
  }
}

/* =========================
   🎯 EVENT LISTENERS
========================= */

searchForm.addEventListener("submit", handleSearch);
songList.addEventListener("click", handleFavoriteClick);
favoriteList.addEventListener("click", handleRemoveFavorite);
sortSelect.addEventListener("change", handleSort);
viewAllBtn.addEventListener("click", handleViewAll);
favoriteLink.addEventListener("click", toggleFavorites);
clearBtn.addEventListener("click", handleClearSearch);
searchInput.addEventListener("input", handleInputChange);

songList.addEventListener("play", handleNowPlaying, true);
favoriteList.addEventListener("play", handleNowPlaying, true);

/* =========================
   🚀 INITIALIZATION
========================= */

renderFavorites();
updateFavoritesCount();
loader.classList.add("hidden");
