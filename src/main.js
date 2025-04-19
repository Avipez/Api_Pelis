const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
});

//Utils

function morePagesButton() {
  let i = 1
  if (i =>2 ) {
    const oldBtn = document.querySelector(".oldBtn");
    console.log(oldBtn);
    genericSection.removeChild(oldBtn)
  }
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.classList.add("oldBtn")
  loadMoreBtn.innerText = "Cargar mas";
  loadMoreBtn.addEventListener("click", moreMoviePages);
  genericSection.appendChild(loadMoreBtn);
  i++
}

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img")
      entry.target.setAttribute("src", url)
    }
  })
})

function fillMoviesInfo(
  movies,
  node,
  {
    lazyLoad = false,
    clean = true
  } = {}
  ) {
  if (clean) {
    node.innerHTML = "";
  }
  movies.forEach( movie => {
  
    const movieSlide = document.createElement("div");
    
    movieSlide.classList.add("movie-container");
  
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img": "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );
    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`
    });
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute("src", "https://critics.io/img/movies/poster-placeholder.png")
    });

    const movieBtn = document.createElement("button");
    movieBtn.classList.add("movie-btn");
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      /* addToFavorites, */
      //agregar a local storage
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieSlide.appendChild(movieImg);
    movieSlide.appendChild(movieBtn);
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

    fillMoviesInfo(movies, trendingMoviesPreviewList , {
      lazyLoad: true,
      clean: true
    });
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
  
  maxPage = data.total_pages;

  fillMoviesInfo(movies, genericSection, {
    lazyLoad: true,
    clean: false
  })
  
};

function categoryPageInifniteScrolling(id) {
  return async function () {
    const { 
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax){
      page++;
      const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
          page,
        }
      });
      const movies = data.results;
      /* trendingPreviewSection.scrollTop; */
    
      fillMoviesInfo(movies, genericSection, {
        lazyLoad: true,
        clean: false
      })
    }
  
    /* morePagesButton(); */

  }
}


async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    }
  });
  const movies = data.results;
  
  maxPage = data.total_pages;
  
  fillMoviesInfo(movies, genericSection, {
    lazyLoad: true,
    clean: false
  })
  
};

 function movieSearchInifiniteScrolling(query) {
  return async function () {
    const { 
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax){
      page++;
      const { data } = await api('search/movie', {
        params: {
          query,
          page,
        }
      });
      const movies = data.results;
      /* trendingPreviewSection.scrollTop; */
    
      fillMoviesInfo(movies, genericSection, {
        lazyLoad: true,
        clean: false
      })
    }
  
    /* morePagesButton(); */

  }
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;
  maxPage = data.total_pages;
  fillMoviesInfo(movies, genericSection,
    {
    lazyLoader: true,
    clean: true
    }
  );
  morePagesButton();
};

async function moreMoviePages() {
  const { 
      scrollTop,
      scrollHeight,
      clientHeight
  } = document.documentElement;
  
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax){
    page++;
    const { data } = await api('trending/movie/day', {
      params: {
        page: page
      }
    });
    const movies = data.results;

    fillMoviesInfo(
      movies,
     genericSection,
    {
      lazyLoader: true,
      clean: false
    });
  }

  /* morePagesButton(); */
}

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

  fillMoviesInfo(relatedMovies, relatedMoviesContainer, {
    lazyLoad: true,
    clean: false
  });
}
//