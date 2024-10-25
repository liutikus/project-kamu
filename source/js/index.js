import { formatDate,getGenres } from "./data/data.js";

let data=[]
let number= 1

renderPage()

function renderPage(){
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NjQ1Ny4wNTA3NTksInN1YiI6IjY3MDc4MzcwZDA2MTZjN2IxOWZiNDEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uiEdUQrKbS11i0JkXLX9TB5yWoAFWJ16YoNjysd_LCA'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${number}`, options)
    .then(response => response.json())
    .then(response => {
        const data=response
        console.log(data)
        renderMovies(data)
        getGenres(data)
        createCarousell()
        showInfo(data)
        
    })
    .catch(err => console.error(err));

function renderMovies(data){

    let html=``;
    const movieData=data.results
    movieData.forEach(movie=> {

        html+=`
                <div class="poster-carousell" data-movie-id="${movie.id}" >
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top" alt="...">
                    <div class="movie-info movie-info-off js-movie-${movie.id}" >
                        <p class="movie-title">${movie.title} <span>(${formatDate(movie.release_date)})</span></p>
                        <p class="movie-rating">★ ${movie.vote_average} (${movie.vote_count})</p>
                        <a href="#" class="wishlist-btn">Wishlist</a>
                    </div>
                </div>
              `
        document.querySelector('.movies-container')
            .innerHTML=html
        
            
        });
    }
   
}

document.querySelector('.js-next-page-btn')
    .addEventListener('click', ()=>{
       number++
       renderPage()
    })

document.querySelector('.js-previous-page-btn')
    .addEventListener('click', ()=>{
        if(number <=1){
            return
        }
        else{
            number--
            renderPage()
        }
    })

document.querySelector('.js-burger-container')
    .addEventListener('click', () =>{
        document.querySelector('.js-burger-container')
            .classList.toggle('change')
        document.querySelector('.js-background-change')
            .classList.toggle('dark-cover')
        document.querySelector('.js-burger-menu')
            .classList.toggle('menu-off')
    })


function createCarousell(){
    var elem = document.querySelector('.main-carousel');
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

