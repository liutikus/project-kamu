import { renderMovies, renderSeries } from "./data/data.js";


renderMovies()
renderSeries()

document.querySelector('.js-burger-container')
    .addEventListener('click', () =>{
        document.querySelector('.js-burger-container')
            .classList.toggle('change')
        document.querySelector('.js-background-change')
            .classList.toggle('dark-cover')
        document.querySelector('.js-burger-menu')
            .classList.toggle('menu-off')
    })




