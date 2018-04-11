const addReview = function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  console.log(formData);

  const rev = fetch("http://localhost:8000/add-review", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      id: formData.id,
      review: formData.review,
      rating: formData.rating
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
};

export { addReview };
