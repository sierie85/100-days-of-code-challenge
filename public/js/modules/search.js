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
        searchResults.innerHTML += `<li class="title">Movies:</li>`;
        data.movies.map(
          res =>
            (searchResults.innerHTML += `<li><a href='/movies/${res}'>${res}</a></li>`)
        );
        searchResults.innerHTML += `<hr/>`;
      }
      if (data.actors) {
        searchResults.innerHTML += `<li class="title">Actor:</li>`;
        data.actors.map(res => {
          searchResults.innerHTML += `<li><a href='/movies/?actors=${res}'>${res}</a></li>`;
        });
        searchResults.innerHTML += `<hr/>`;
      }
    });
}

export { search };
