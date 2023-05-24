//getting all the buttons
let buttons = document.getElementsByTagName("button");
let favouriteCharacters = document.getElementById("favourite-chars");

//getting the data from local storage
function getStorage() {
  let data = JSON.parse(localStorage.getItem("favourite")) || [];
  return data;
}

//setting the items in local storage
function setStorage(data) {
  let string = JSON.stringify(data);
  localStorage.setItem("favourite", string);
}

//this function will add the character to favourites
function addToFavourite(e) {
  //getting the data from button which when clicked
  let data = JSON.parse(e.getAttribute("data-hero"));
  let favouriteList = getStorage();
  console.log(e);
  //iterating through list of characters in favourite list
  //checking whether the character already present in the favourite list
  for (let character of favouriteList) {
    if (character.id === data.id) {
      for (let button of buttons) {
        //character is already in favorites, remove the character
        if (button === e) {
          button.innerHTML = `<span class="material-symbols-outlined">
heart_plus
</span>`;
        }
      }
      favouriteList.splice(character, 1);
      setStorage(favouriteList);
      window.location.reload();
      return;
    }
  }
  //if character not present in favorites, add the character.
  favouriteList.push(data);
  setStorage(favouriteList);
  for (let button of buttons) {
    if (button === e) {
      button.innerHTML = `<span class="material-symbols-outlined">heart_minus</span>`;
    }
  }
}
//function to show all the charcters in favorites
function showFavourites() {
  let favouriteList = getStorage();
  console.log(favouriteList);

  //if no characters present
  if (favouriteList.length <= 0) {
    favouriteCharacters.innerHTML = "No Characters Added";
    return;
  }

  for (let char of favouriteList) {
    const { id, name, path } = char;

    let character = document.createElement("div");
    character.classList.add("character");
    character.setAttribute("id", id);
    let infopath = `../views/superhero.html#${id}`;
    character.innerHTML = `<img src=${path}.jpg alt=${name} />
        <div class="card-body">
            <a href=${infopath}>${name}</a>
            <button id=${id} data-hero='{"id":"${id}","name":"${name}","path":"${path}"}' onclick="addToFavourite(this)"><span class="material-symbols-outlined">heart_minus</span></button>
        </div>`;
    favouriteCharacters.appendChild(character);
  }
}

//calling showFavourites function when only the favorite characters are present.
if (favouriteCharacters != null) {
  showFavourites();
}
