import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm'

export function formatDate(releaseDate){
    return dayjs(releaseDate).format('D MMMM YYYY')
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
           console.log(movieData)
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
            document.querySelector(`.genre-${movie.id}`).innerHTML=html
            
           });
        })
        .catch(err => console.error(err));

}