'use strict';
//global variables
const listDrinks = document.querySelector('.js-list');
const urlServer = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlPlaceholder =
  'https://via.placeholder.com/210x295/BBACEB/666666/?text=coctelphoto';
const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const message = document.querySelector('.js-message');
const favList = document.querySelector('.js-fav-list');
let listFavouritesDrinks = [];
let drinks = [];
//html render drinks
function paintDrinks() {
  let html = '';
  for (const drink of drinks) {
    html += `<li class= "js-drinks" id=${drink.idDrink}>`;
    html += `<h2>${drink.strDrink}</h2>`;
    html += `<img class = "drinks-photo" src=${
      drink.strDrinkThumb || urlPlaceholder
    } alt ="Foto bebida"/>`;
    html += `</li>`;
  }
  listDrinks.innerHTML = html;
  message.innerHTML = '';
}
//html render fav drinks
function paintFavDrinks() {
  for (const drink of listFavouritesDrinks) {
    favList.innerHTML += `<li id=${drink.idDrink}>`;
    favList.innerHTML += `<h2 class ="title-drink">${drink.strDrink}</h2>`;
    favList.innerHTML += `<img class = "drinks-photo" src=${
      drink.strDrinkThumb || urlPlaceholder
    } alt ="Foto bebida"/><i class="fa-solid fa-bookmark"></i>`;
    favList.innerHTML += `</li>`;
  }
}

//favourite drinks function
function handleClickFav(event) {
  const idDrinkSelected = event.currentTarget.id;
  const drinkFoundlist = drinks.find((drink) => {
    return drink.idDrink === idDrinkSelected;
  });
  const favFoundIndex = listFavouritesDrinks.findIndex((drink) => {
    return drink.idDrink === idDrinkSelected;
  });
  if (favFoundIndex === -1) {
    listFavouritesDrinks.push(drinkFoundlist);
  } else {
    listFavouritesDrinks.splice(favFoundIndex, 1);
  }
  console.log(listFavouritesDrinks);
  paintFavDrinks();
}

function addFavListener() {
  const lidrinks = document.querySelectorAll('.js-drinks');
  for (const item of lidrinks) {
    item.addEventListener('click', handleClickFav);
  }
}

function handleClickSearch(event) {
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
        paintDrinks();
        addFavListener();
      });
  }
}
//event click search
btnSearch.addEventListener('click', handleClickSearch);
