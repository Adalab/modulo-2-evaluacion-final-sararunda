'use strict';
//variables globales
const listDrinks = document.querySelector('.js-list');
const urlServer =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let drinks = [];
//peticion al servidor
fetch(urlServer)
  .then((response) => response.json())
  .then((data) => {
    drinks = data.drinks;
    console.log(drinks);
  });
