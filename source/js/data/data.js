import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm'

export function formatDate(releaseDate){
    return dayjs(releaseDate).format('YYYY')
}

export function getGenres(data){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NjQ1Ny4wNTA3NTksInN1YiI6IjY3MDc4MzcwZDA2MTZjN2IxOWZiNDEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uiEdUQrKbS11i0JkXLX9TB5yWoAFWJ16YoNjysd_LCA'
        }
      };
      
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(response => {
           const allGenres= response.genres
           const movieData = data.results
           
           movieData.forEach(movie => {
            const movieGenres =movie.genre_ids
            let html='';
            movieGenres.forEach(genre=>{
                allGenres.forEach(genres =>{
                    if(genres.id === genre){
                        html+=`  <p class="col genres-icon">${genres.name}</p>`
                    }
                })
            })
           // document.querySelector(`.genre-${movie.id}`).innerHTML=html
            
           });
        })
        .catch(err => console.error(err));

}

export function renderMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NjQ1Ny4wNTA3NTksInN1YiI6IjY3MDc4MzcwZDA2MTZjN2IxOWZiNDEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uiEdUQrKbS11i0JkXLX9TB5yWoAFWJ16YoNjysd_LCA'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            const data=response
            console.log(data)
            renderContent(data, 'movies')
            getGenres(data)
            createCarousell('movies')
            showInfo(data)
            
        })
        .catch(err => console.error(err));
    
    }

function createCarousell(contentType){
    var elem = document.querySelector(`.main-carousel-${contentType}`);
    var flkty = new Flickity( elem, {
        // options
        cellAlign: 'left',
        contain: true ,
        groupCells: true
    });

}


  function showInfo(data){
     
    mouseOver(data)
    mouseOut(data)

  }  
  
function mouseOver(data){
    document.querySelectorAll('.poster-carousell')
    .forEach((info) => {
      info.addEventListener('mouseover', ()=>{
          const movieId= info.dataset.movieId
          const moviesData= data.results

          moviesData.forEach((movie)=>{

              if(Number(movieId) === movie.id){
                  document.querySelector(`.js-movie-${movie.id}`)
                      .classList.remove('movie-info-off')
                 
              }
          })
      })
    });
}
  
function mouseOut(data){
    document.querySelectorAll('.poster-carousell')
    .forEach((info) => {
      info.addEventListener('mouseout', ()=>{
          const movieId= info.dataset.movieId
          const moviesData= data.results

          moviesData.forEach((movie)=>{

              if(Number(movieId) === movie.id){
                  document.querySelector(`.js-movie-${movie.id}`)
                      .classList.add('movie-info-off')
                 
              }
          })
      })
    });
}

export function renderSeries(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NjQ1Ny4wNTA3NTksInN1YiI6IjY3MDc4MzcwZDA2MTZjN2IxOWZiNDEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uiEdUQrKbS11i0JkXLX9TB5yWoAFWJ16YoNjysd_LCA'
        }
      };
      
      fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(res =>{
            const data = res
            console.log(data)
            renderContent(data, 'series' )
            getGenres(data)
            createCarousell('series')
            showInfo(data)
        })
        .catch(err => console.error(err));
}

function renderContent(data, contentType){
    
    let html=``;
    const movieData=data.results
    
    movieData.forEach(movie=> {
        let contentTitle
        if(movie.title){
            contentTitle= movie.title

        }
        else{
            contentTitle= movie.name
        }
        html+=`
                <div class="poster-carousell" data-movie-id="${movie.id}" >
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top" alt="...">
                    <div class="movie-info movie-info-off js-movie-${movie.id}" >
                        <p class="movie-title">${contentTitle} <span style="display:block;">(${formatDate(movie.release_date)})</span></p>
                        <p class="movie-rating">★ ${movie.vote_average} (${movie.vote_count})</p>
                        <a href="#" class="wishlist-btn">Wishlist</a>
                    </div>
                </div>
              `
        document.querySelector(`.${contentType}-container`)
            .innerHTML=html
        
            
        });
    }
   

