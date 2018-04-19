const res = {
  _id: "5ad307eb4335a436a493e72d",
  movie: [
    "5ad30730b8a4193b2062fc6e",
    "5ad30730b8a4193b2062fc6c",
    "5ad30730b8a4193b2062fc6b",
    "5ad30730b8a4193b2062fc6d",
    "5ad30730b8a4193b2062fc70",
    "5ad30731b8a4193b2062fc71",
    "5ad30731b8a4193b2062fc72",
    "5ad30731b8a4193b2062fcb9"
  ]
};
const watchedCount = res.movie.length;

const achievements = {
  watched: {
    watched1: 1,
    watched10: 10,
    watched100: 100
  }
};

const output = (ach, count) => {
  const value = Object.keys(ach).reduce((a, b) => {
    console.log(a, b);
    console.log(ach[b], count);
    if (count >= ach[b]) {
      return (a = ach[b]);
    }
    return a;
  }, 0);
  return getKeyByValue(ach, value);
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const foo = output(achievements.watched, watchedCount);
console.log(foo);
