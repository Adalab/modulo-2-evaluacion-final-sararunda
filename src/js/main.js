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
const btnReset = document.querySelector('.js-btn-reset');
let listFavouritesDrinks = []; //array dav drinks
let drinks = []; //array all drinks
// 9.traer de localstorage
const getLocalStorage = localStorage.getItem('drinksFav');
listFavouritesDrinks = JSON.parse(getLocalStorage);
if (listFavouritesDrinks === null) {
  listFavouritesDrinks = [];
}
paintFavDrinks();
removeFavListener();
//2.html render all drinks
function paintDrinks() {
  let html = '';
  for (const drink of drinks) {
    const favFoundIndex = listFavouritesDrinks.findIndex((favDrink) => {
      return favDrink.idDrink === drink.idDrink;
    });
    let favClass = '';
    if (favFoundIndex !== -1) {
      favClass = 'title-drink';
    }
    html += `<li class= "js-drinks ${favClass}" id=${drink.idDrink}>`;
    html += `<h2 class="main__list-container__list__item-title">${drink.strDrink}</h2>`;
    html += `<img class = "main__list-container__list__item-title__drinks-photo" src=${
      drink.strDrinkThumb || urlPlaceholder
    } alt ="Foto bebida"/>`;
    html += `</li>`;
  }
  listDrinks.innerHTML = html;
  message.innerHTML = '';
}
//5.html render fav drinks
function paintFavDrinks() {
  let htmlFav = '';
  for (const drink of listFavouritesDrinks) {
    htmlFav += `<li class="js-drinks-fav" id=${drink.idDrink}>`;
    htmlFav += `<h2 class="main__list-container__list__item-title">${drink.strDrink}<i class="fa-solid fa-bookmark"></i></h2>`;
    htmlFav += `<img class="main__list-container__list__item-title__drinks-photo" src=${
      drink.strDrinkThumb || urlPlaceholder
    } alt ="Foto bebida"/>`;
    htmlFav += `</li>`;
  }
  favList.innerHTML = htmlFav;
}
//7.function remove fav drink
function removeDrinkFav(event) {
  const idDrinkSelected = event.currentTarget.id;
  const favFoundIndex = listFavouritesDrinks.findIndex((drink) => {
    return drink.idDrink === idDrinkSelected;
  });
  listFavouritesDrinks.splice(favFoundIndex, 1);
  paintDrinks();
  addFavListener();
  paintFavDrinks();
  removeFavListener();
}
//.6 event click to remove
function removeFavListener() {
  const liFavdrinks = document.querySelectorAll('.js-drinks-fav');
  for (const item of liFavdrinks) {
    item.addEventListener('click', removeDrinkFav);
  }
}
//4.choose favourite drink function
function handleClickFav(event) {
  const idDrinkSelected = event.currentTarget.id;
  const clickedDrink = drinks.find((drink) => {
    return drink.idDrink === idDrinkSelected;
  });
  const favFoundIndex = listFavouritesDrinks.findIndex((drink) => {
    return drink.idDrink === idDrinkSelected;
  });

  if (favFoundIndex === -1) {
    listFavouritesDrinks.push(clickedDrink);
    event.currentTarget.classList.add('title-drink');
  } else {
    listFavouritesDrinks.splice(favFoundIndex, 1);
    event.currentTarget.classList.remove('title-drink');
  }
  //8.Guardar en local storage
  localStorage.setItem('drinksFav', JSON.stringify(listFavouritesDrinks));
  paintFavDrinks();
  removeFavListener();
}
//3.event click fav
function addFavListener() {
  const lidrinks = document.querySelectorAll('.js-drinks');
  for (const item of lidrinks) {
    item.addEventListener('click', handleClickFav);
  }
}

function handleClickSearch(event) {
  event.preventDefault();
  if (inputSearch.value === '') {
    message.innerHTML = '* introduce un término de búsqueda';
    listDrinks.innerHTML = '';
  } else {
    //server request
    fetch(urlServer + inputSearch.value)
      .then((response) => response.json())
      .then((data) => {
        drinks = data.drinks || [];
        paintDrinks();
        addFavListener();
      });
  }
}
//1.event click search
btnSearch.addEventListener('click', handleClickSearch);

//10.reset btn
function handleClickReset() {
  listDrinks.innerHTML = '';
  favList.innerHTML = '';
  inputSearch.value = '';
}

btnReset.addEventListener('click', handleClickReset);
