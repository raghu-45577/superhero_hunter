window.onload = function () {
  //getting all required elements
  let card = document.getElementById("card");
  let info = document.getElementById("info");
  let series = document.getElementById("series");
  let pageurl = window.location.href;
  let id = pageurl.substring(pageurl.lastIndexOf("#") + 1);

  //url, public key and hash value for calling the api.
  const BASE_URL = "https://gateway.marvel.com/v1/public";
  const publicKey = "28a799e9d961cd776fa7aacf712903b6";
  const hash = "67f1536e943e3fba98e550e70ae7e97f";

  //url to fetch all the characters based on the id
  const url1 = `${BASE_URL}/characters/${id}?ts=1&apikey=${publicKey}&hash=${hash}`;

  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      let hero = data.data.results[0];
      console.log(hero);
      const { name, description, thumbnail } = hero;
      info.innerHTML = `
    <img src=${thumbnail.path}.jpg alt="" />
    <div class="text">
        <h1><u>${name}</u></h1>
        <p>${description}</p>
    </div>`;

      card.appendChild(info);
    });
  //url to fetch all the series of the required character
  const url2 = `${BASE_URL}/characters/${id}/series?ts=1&apikey=${publicKey}&hash=${hash}`;
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      let result = data.data.results;
      console.log(result);
      for (let idx in result) {
        if (idx < 5) {
          const { title, thumbnail, description } = result[idx];
          let div = document.createElement("div");
          div.classList.add("block");
          div.innerHTML = `
            <img src=${thumbnail.path}.jpg alt="" />
            <div class="text">
                <h3><u>${title}</u></h3>
                <p>${description || "description not available"}</p>
            </div>`;
          series.appendChild(div);
        }
      }

      card.appendChild(series);
    });
};
