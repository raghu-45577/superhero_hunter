var heroes = document.querySelector("#heroes");
var searchBar = document.querySelector("#search-bar");
var searchResults = document.querySelector("#search-results");

//url, public key and hash value for calling the api.
const BASE_URL = "https://gateway.marvel.com/v1/public";
const publicKey = "28a799e9d961cd776fa7aacf712903b6";
const hash = "67f1536e943e3fba98e550e70ae7e97f";

//getting all the characters
async function getAllHeroes() {
  const response = await fetch(
    `${BASE_URL}/characters?ts=1&apikey=${publicKey}&hash=${hash}`
  );
  const data = await response.json();
  return data;
}

//fetching all the favourite characters stored in the local storage
let favourites = JSON.parse(localStorage.getItem("favourite")) || [];

getAllHeroes().then((data) => {
  let allHeroes = data.data.results;
  heroes.innerHTML = "";

  //iterating through all the characters for creating the elements.
  for (let i = 0; i < allHeroes.length; i++) {
    let favourite = `<span class="material-symbols-outlined">heart_plus</span>`;

    //to check whether the character is in favourite characters list.
    for (let fav of favourites) {
      if (allHeroes[i].id == fav.id) {
        favourite = `<span class="material-symbols-outlined">heart_minus</span>`;
      }
    }
    const { id, thumbnail, name } = allHeroes[i];

    //creating an element to show the data
    let hero = document.createElement("div");
    hero.classList.add("character");
    hero.setAttribute("id", id);
    //path which lands in more-info page
    let path = `./views/superhero.html#${id}`;
    //create a card for character and sending the data using button to local storage
    hero.innerHTML = `<img src=${thumbnail.path}.jpg alt=${name} />
        <div class="card-body">
            <a href=${path}>${name}</a>
            <button id=${id} data-hero='{"id":"${id}","name":"${name}","path":"${thumbnail.path}"}' onclick="addToFavourite(this)">${favourite}</button>
        </div>`;
    heroes.appendChild(hero);
  }
});

searchBar.addEventListener("input", function () {
  searchHero(searchBar.value);
});

//function to search the characters based on the provided keyword
async function searchHero(keyword) {
  if (!keyword) {
    searchResults.innerHTML = "";
    return;
  }

  await fetch(
    `${BASE_URL}/characters?nameStartsWith=${keyword}&ts=1&apikey=${publicKey}&hash=${hash}`
  )
    .then((res) => res.json())
    .then((data) => showSearchedHeroes(data.data.results));
}

//to show all the characters whose names starts with the keyword
function showSearchedHeroes(heroes) {
  searchResults.innerHTML = "";
  //taking only first 5 characters, since the list is too large
  let count = 1;
  for (let index in heroes) {
    let favourite = `<span class="material-symbols-outlined">heart_plus</span>`;
    for (let fav of favourites) {
      if (heroes[index].id === fav.id) {
        favourite = `<span class="material-symbols-outlined">heart_minus</span>`;
      }
    }
    const { id, thumbnail, name } = heroes[index];

    if (count <= 5) {
      let li = document.createElement("li");
      //this path will take us to more-info page of character.
      let path = `./views/superhero.html#${id}`;
      li.setAttribute("id", id);
      li.innerHTML += `
                <div class="search-result">
                    <img src=${thumbnail.path}.jpg alt=${name} />
                    <a href=${path}>${name}</a>
                    <button id=${id} data-hero='{"id":"${id}","name":"${name}","path":"${thumbnail.path}"}' onclick="addToFavourite(this)">${favourite}</button>
                </div>`;
      searchResults.appendChild(li);
    }
    count++;
  }
}
