function updateUserList() {
  const movieid = this.dataset.movieid;
  const schema = this.dataset.schema;
  console.log("switched", movieid, schema);

  const update = fetch("http://localhost:8000/updatelist", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ movieid, schema })
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

export { updateUserList };
