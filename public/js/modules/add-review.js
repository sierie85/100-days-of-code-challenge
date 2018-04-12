const addReview = function(e) {
  e.preventDefault();

  const rev = fetch("http://localhost:8000/add-review", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      movieid: this.querySelector('input[name="movieid"').value,
      review: this.querySelector('textarea[name="review"').value,
      rating: this.querySelector('input[name="rating"').value
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
};

export { addReview };
