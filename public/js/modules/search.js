function search(e) {
  e.prevenDefault;
  const val = this.value;
  const searchResults = document.querySelector(".search-results ul");

  if (val.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  const search = fetch("http://localhost:8000/search", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ query: val })
  })
    .then(res => res.json())
    .then(data => {
      searchResults.innerHTML = "";

      if (data.movies) {
        data.movies.map(
          res =>
            (searchResults.innerHTML += `<li><a href='/movies/${res.name}'>${
              res.name
            }</a></li>`)
        );
      }
      if (data.actors) {
        data.actors.map(
          res =>
            (searchResults.innerHTML += `<li><a href='/movies/${res.name}'>${
              res.name
            }</a></li>`)
        );
      }
    });
}

export { search };
