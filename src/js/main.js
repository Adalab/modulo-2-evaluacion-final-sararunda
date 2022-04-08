'use strict';
//global variables
const listDrinks = document.querySelector('.js-list');
const urlServer = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const message = document.querySelector('.js-message');

let drinks = [];

function handleClick(event) {
  event.preventDefault();

  if (inputSearch.value === '') {
    message.innerHTML = 'introduce un término de búsqueda';
    listDrinks.innerHTML = '';
  } else {
    //server request
    fetch(urlServer + inputSearch.value)
      .then((response) => response.json())
      .then((data) => {
        drinks = data.drinks;
        console.log(drinks);
        //HTML render
        let html = '';
        for (const drink of drinks) {
          html += `<li>`;
          html += `<h2 class ="title-drink">${drink.strDrink}</h2>`;
          html += `<img class = "drinks-photo" src=${drink.strDrinkThumb} alt ="Foto bebida"/><i class="fa-solid fa-bookmark"></i>`;
          html += `</li>`;
        }
        listDrinks.innerHTML = html;
        message.innerHTML = '';
      });
  }
}
//event click
btnSearch.addEventListener('click', handleClick);
