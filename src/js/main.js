'use strict';
//variables globales
const listDrinks = document.querySelector('.js-list');
const urlServer = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');

let drinks = [];
//peticion al servidor

//evento a escuchar

function handleClick(event) {
  event.preventDefault();
  fetch(urlServer + inputSearch.value)
    .then((response) => response.json())
    .then((data) => {
      drinks = data.drinks;
      console.log(drinks);
      //renderizar HTML
      let html = '';
      for (const drink of drinks) {
        html += `<li>`;
        html += `<h2>${drink.strDrink}</h2>`;
        html += `<img class = "drinks-photo" src=${drink.strDrinkThumb} alt ="Foto bebida"/>`;
        html += `</li>`;
      }
      listDrinks.innerHTML = html;
    });
}

btnSearch.addEventListener('click', handleClick);
