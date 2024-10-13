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
    })
    .catch(err => console.error(err));

function renderMovies(data){

    let html=``;
    const movieData=data.results
    movieData.forEach(movie=> {
        console.log(movie)
        html+=`
                <div class=" mt-5 movie-card" >
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top" alt="...">
                    <div class="info-container">
                      <p class="card-text movie-title">${movie.title}</p>
                      <p>${formatDate(movie.release_date)}</p>
                      <div class="container">
                      <div class="genre-${movie.id} movie-genres row">
                      </div>
                      </div>
                      <p>${movie.overview}</p>
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
