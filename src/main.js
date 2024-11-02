const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': process.env.API_KEY,
    },
});

//Utils

function fillMoviesInfo(movies, node ) {
  node.innerHTML = "";
  movies.forEach( movie => {
  
    const movieSlide = document.createElement("div");
    movieSlide.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`
    });
    movieSlide.classList.add("movie-container");
  
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
  
    movieSlide.appendChild(movieImg);
    node.appendChild(movieSlide);

  });
}

function fillCategoryInfo(categories, container) {
  container.innerHTML = "";
  categories.forEach( category => {
        const categoriesPreviewList = document.querySelector("#categoriesPreview .categoriesPreview-list")

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", "id" + category.id);
        categoryTitle.addEventListener("click", () => {
          location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// API Calls

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    fillMoviesInfo(movies, trendingMoviesPreviewList);
};


async function getMovieCategories() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    fillCategoryInfo(categories, categoriesPreviewList);   

};

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;
  trendingPreviewSection.scrollTop;

  fillMoviesInfo(movies, genericSection)
  
};


async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    }
  });
  const movies = data.results;
  trendingPreviewSection.scrollTop;

  fillMoviesInfo(movies, genericSection)
  
};

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;
  fillMoviesInfo(movies, genericSection);
};

async function getMovieInfo(id) {
  const { data: movie } = await api(`movie/${id}`);
  const movieImgURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgURL})`
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  fillCategoryInfo(movie.genres, movieDetailCategoriesList);
  getRelatedMovies(id);
};

async function getRelatedMovies(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  fillMoviesInfo(relatedMovies, relatedMoviesContainer);
}API_KEY=12d940248e2b863a48f411540da51a9a
