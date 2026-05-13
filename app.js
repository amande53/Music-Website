const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const songList = document.querySelector("#songs-list");
const resultsMessage = document.querySelector("#results-message");
const favoriteList = document.querySelector("#favorites-list");
const sortSelect = document.querySelector("#sort-select");
const favoriteLink = document.querySelector(`a[href="#favorites"]`)
const favoritesSection = document.querySelector(".favorites-section")
const viewAllBtn = document.querySelector("#view-all-btn")

let currentSongs = []
let displayedSongs = []
let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];
let showAllSongs = false

const songCard = (song, isFavorite = false) => {
  return `
    <div class="song-card">
      <img
        src="${song.artworkUrl100}"
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

        <audio controls>
          <source
            src="${song.previewUrl}"
            type="audio/mpeg"
          >
        </audio>
      </div>
    </div>
  `;
};

const renderSongs = () => {
  const songsToRender = showAllSongs
    ? displayedSongs
    : displayedSongs.slice(0, 6)
  
  songList.innerHTML = songsToRender
  .map(song => songCard(song)).join("")
}

const renderFavorites = () => {
  favoriteList.innerHTML = favorites
    .map((song) => songCard(song, true))
    .join("");
};

async function handleSearch(event) {
  event.preventDefault();

  const searchValue = searchInput.value.trim();

  if (searchValue === "") {
    resultsMessage.textContent =
      "Please enter a song or artist.";

    return;
  }

  resultsMessage.textContent = "Tuning the vibes...";


    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchValue}&entity=song`
      );

    const data = await response.json();

    currentSongs = data.results;
      displayedSongs = [...data.results]
      
      showAllSongs = false
      viewAllBtn.textContent = "View All"

    renderSongs()

    resultsMessage.textContent =
      `Showing results for "${searchValue}"`;

  } catch (error) {
    resultsMessage.textContent =
      "The beat dropped... but the API didn't.";

    console.log(error);
  }
}

function handleFavoriteClick(event) {
  if (
    event.target.classList.contains("favorite-btn")
  ) {
    const trackId =
      event.target.dataset.trackId;

    const selectedSong = currentSongs.find(
      (song) => song.trackId == trackId
    );

    const alreadyFavorited = favorites.some(
      (song) => song.trackId == trackId
    );

    if (alreadyFavorited) {
      return;
    }

    favorites.push(selectedSong);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    renderFavorites();
  }
}

function handleRemoveFavorite(event) {
  if (
    event.target.classList.contains("remove-btn")
  ) {
    const trackId =
      event.target.dataset.trackId;

    favorites = favorites.filter(
      (song) => song.trackId != trackId
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    renderFavorites();
  }
}

function handleSort(event) {
  const sortValue = event.target.value;

  if (sortValue === "a-z") {
    displayedSongs.sort((a, b) =>
      a.trackName.localeCompare(b.trackName)
    );
  }

  if (sortValue === "z-a") {
    displayedSongs.sort((a, b) =>
      b.trackName.localeCompare(a.trackName)
    );
  }

  renderSongs();
}

function handleViewAll() {
  showAllSongs = !showAllSongs

  renderSongs()

  viewAllBtn.textContent = showAllSongs
  ? "Show Less"
  : "View All"
}
searchForm.addEventListener(
  "submit",
  handleSearch
);

songList.addEventListener(
  "click",
  handleFavoriteClick
);

favoriteList.addEventListener(
  "click",
  handleRemoveFavorite
);

sortSelect.addEventListener("change", handleSort)
function toggleFavorites() { favoritesSection.classList.toggle("active") }
viewAllBtn.addEventListener("click", handleViewAll)
favoriteLink.addEventListener("click", toggleFavorites);
renderFavorites();