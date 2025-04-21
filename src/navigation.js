let page = 1;
let maxPage;
let infiniteScrolling;

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
})

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back()
  /* location.hash = "#home"; */
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener("scroll", infiniteScrolling, false);

function navigator() {
  console.log({ location });
  console.log(infiniteScrolling);

  if(infiniteScrolling) {
    window.removeEventListener("scroll", infiniteScrolling, { pasive: false });
    infiniteScrolling = undefined;
  }
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScrolling) {
    window.addEventListener("scroll", infiniteScrolling, { pasive: false });
  }

}


function homePage() {
  console.log('Home!!');
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  favoriteMovieSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getMovieCategories();
  getFavoriteMovies();
}

function categoriesPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  favoriteMovieSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  console.log('categories!!');
  const [_, CAT_INFO] = location.hash.split("=");
  const [CAT_ID, CAT_NAME] = CAT_INFO.split("-");
  headerCategoryTitle.innerHTML = CAT_NAME;

  getMoviesByCategory(CAT_ID);

  infiniteScrolling = categoryPageInifniteScrolling(CAT_ID);
}

function movieDetailsPage() {
  headerSection.classList.add("header-container--long");
  /* headerSection.style.background = ""; */
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  favoriteMovieSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
  console.log('Movie!!');

  const [_, movieId] = location.hash.split("=");

  getMovieInfo(movieId);
}

function searchPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  favoriteMovieSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);

  infiniteScrolling = movieSearchInifiniteScrolling(query);
}

function trendsPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  favoriteMovieSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies()

  infiniteScrolling = moreMoviePages;
}
