const addReview = function() {
  const rev = fetch("http://localhost:8000/add-review", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      movieid: this.querySelector('input[name="movieid"]').value,
      review: this.querySelector('textarea[name="review"]').value,
      rating: this.querySelector('input[name="rating"]:checked').value
    })
  })
    .then(res => res.json())
    .then(data => {
      const reviewEle = document.querySelector(".reviews");
      reviewEle.insertAdjacentHTML(
        "afterbegin",
        `<div class='col mb-3'>
          <div class='card'>
            <div class='card-header d-flex flex-row'>
              <span class='mr-auto'>${data.rating}</span>
              <span>${data.user.name ? data.user.name : data.user.email}</span>
            </div>
            <div class='card-body'>
              <p>${data.review}</p>
            </div>
            <div class='card-footer'>
              <p>${data.created}</p>
            </div>
          </div>
        </div>`
      );
      this.parentNode.removeChild(this);
    });
  this.removeEventListener("submit", addReview, false);
};

export { addReview };
