const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

var path = require('path');

const customerRouter = require("./routes/index");

const indexRouter = require("./routes/index");
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
// const catalogRouter = require("./routes/catalog");

const customerController = require("./controllers/customerController");

// const genrecontroller = require("./controllers/genreController");
// const authorcontroller = require("./controllers/authorController");
// const bookcontroller = require("./controllers/bookController");
// const bookinstancecontroller = require('./controllers/bookinstanceController');

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.use(express.json());

var urlencodedParser = bodyParser.urlencoded( {extended: false});

//customer post
app.post("/index/customer/create", urlencodedParser, customerController.create_customer_post);
app.post("/index/token/buy", urlencodedParser, customerController.buy_token_post);

//genre posts
// app.post("/catalog/genre/create", urlencodedParser, genrecontroller.genre_create_post);
// app.post("/catalog/genre/:id/delete", urlencodedParser, genrecontroller.genre_delete_post);

// //author posts
// app.post("/catalog/author/create", urlencodedParser, authorcontroller.author_create_post);
// app.post("/catalog/author/:id/delete", urlencodedParser, authorcontroller.author_delete_post);

// //book instance posts
// app.post("/catalog/bookinstance/create", urlencodedParser, bookinstancecontroller.bookinstance_create_post);
// app.post("/catalog/bookinstance/:id/delete", urlencodedParser, bookinstancecontroller.bookinstance_delete_post);

// //book posts
// app.post("/catalog/book/:id/delete", urlencodedParser, bookcontroller.book_delete_post);
// app.post("/catalog/book/create", urlencodedParser, bookcontroller.book_create_post);
// app.post("/catalog/book/:id/update", urlencodedParser, bookcontroller.book_update_post);

mongoDB = "mongodb://127.0.0.1:27017/watermeter";
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/catalog", catalogRouter);

module.exports = app;
