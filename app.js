const PATH = require("path");
const express = require("express");
const session = require("express-session");
const csrf = require("csurf");

const database = require("./data/database");
const authentication = require("./middlewares/authentication");

const configuration = {
  session: require("./configuration/session")
}

const routes = {
  users: require("./routes/users"),
  posts: require("./routes/posts"),
  views: require("./routes/views")
}

const store = configuration.session.store(session);

const app = express();

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(configuration.session.options(store)));
app.use(csrf());

app.use(authentication);

app.use(routes.views);
app.use(routes.users);
app.use("/posts", routes.posts);

app.use(function(error, request, response, next) {
  response.render('500');
})

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});