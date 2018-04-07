function updateWatchlist(e) {
  const movieid = this.dataset.movieid;
  console.log("switched", movieid);

  const update = fetch("http://localhost:8000/update-watchlist", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ movieid })
  })
    .then(res => res.json())
    .then(data => {
      if (data.state === "on") {
        this.classList.add("btn-success");
        this.classList.remove("btn-default");
      } else {
        this.classList.add("btn-default");
        this.classList.remove("btn-success");
      }
    });
}

export { updateWatchlist };
