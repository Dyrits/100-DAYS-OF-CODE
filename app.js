const express = require('express');
const PATH = require('path');
const FS = require('fs');
const UUID = require('uuid');

const manager = require("./helpers/data-manager");

const app = express();

const views = { directory: PATH.join(__dirname, 'views'), };

app.set("views", views.directory);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(PATH.join(__dirname, "public")));

app.get('/', (request, response) => {
  response.render("index");
});

app.post("/recommend", ({ body }, response) => {
  manager.write("restaurants.json", {...body, id: UUID.v4()});
  response.redirect("/confirm");
});

app.get("/restaurants", (request, response) => {
  const restaurants = manager.read("restaurants.json");
  response.render("restaurants", { restaurants });
});

app.get("/restaurants/:id", (request, response) => {
  const restaurant = manager.read("restaurants.json").find(restaurant => restaurant.id === request.params.id);
  response.render("restaurant", { restaurant });
});

app.get("/:file", ({ params }, response) => {
  params.file === "index" ? response.redirect("/") : response.render(params.file);
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});