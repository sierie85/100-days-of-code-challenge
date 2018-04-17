const actors = [
  { actors: ["Stephen Baldwin"], _id: "5ad30731b8a4193b2062fc84" },
  { actors: ["Sterling Hayden"], _id: "5ad30731b8a4193b2062fca1" },
  {
    actors: ["Stellan Skarsgård"],
    _id: "5ad30731b8a4193b2062fccf"
  },
  { actors: ["Steven Bauer"], _id: "5ad30731b8a4193b2062fcd3" },
  { actors: ["Steve McQueen"], _id: "5ad30731b8a4193b2062fce8" }
];

const uniqueActors = actors.reduce((actors, actor) => {
  console.log(actor.actors[0]);
  console.log(typeof actors);
  actor.actors[0];
  console.log(actors.includes(actor.actors[0]));
  if (false === actors.includes(actor.actors[0])) {
    actors.push(actor.actors[0]);
  }
  return actors;
}, []);

console.log(uniqueActors);
