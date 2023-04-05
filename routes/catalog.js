// const express = require("express");
// const router = express.Router();

// const book_controller = require("../controllers/bookController");
// const book_instance_controller = require("../controllers/bookinstanceController");
// const author_controller = require("../controllers/customerController");
// const genre_controller = require("../controllers/genreController");

// ///  BOOK ROUTES ///
// router.get("/", book_controller.index);

// //CREATE BOOK
// router.get("/book/create", book_controller.book_create_get);
// router.post("/book/create", book_controller.book_create_post);

// //DELETE BOOK
// router.get("/book/:id/delete", book_controller.book_delete_get);
// router.post("/book/:id/delete", book_controller.book_delete_post);

// //UPDATE BOOK
// router.get("/book/:id/update", book_controller.book_update_get);
// router.post("/book/:id/update", book_controller.book_update_post);

// //BOOK DETAILS
// router.get("/book/:id", book_controller.book_detail);

// //ALL BOOKS
// router.get("/books", book_controller.book_list);


// ///  AUTHOR ROUTES ///

// //CREATE AUTHOR
// router.get("/author/create", author_controller.author_create_get);
// router.post("/author/create", author_controller.author_create_post);

// //DELETE AUTHOR
// router.get("/author/:id/delete", author_controller.author_delete_get);
// router.post("/author/:id/delete", author_controller.author_delete_post);

// //UPDATE AUTHOR
// router.get("/author/:id/update", author_controller.author_update_get);
// router.post("/author/:id/update", author_controller.author_update_post);

// //FOR ONE AUTHOR
// router.get("/author/:id", author_controller.author_detail);

// //FOR ALL AUTHORS
// router.get("/authors", author_controller.author_list);


// ///  GENRE ROUTES ///

// //CREATE GENRE
// router.get("/genre/create", genre_controller.genre_create_get);
// router.post("/genre/create", genre_controller.genre_create_post);

// //DELETE GENRE
// router.get("/genre/:id/delete", genre_controller.genre_delete_get);
// router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// //UPDATE GENRE
// router.get("/genre/:id/update", genre_controller.genre_update_get);
// router.post("/genre/:id/update", genre_controller.genre_update_post);

// //FOR ONE GENRE
// router.get("/genre/:id", genre_controller.genre_detail);

// //FOR ALL GENRES
// router.get("/genres", genre_controller.genre_list);


// /// BOOK INSTANCE ROUTES  ///

// //CREATE BOOK INSTANCE
// router.get("/bookinstance/create", book_instance_controller.bookinstance_create_get);
// router.post("/bookinstance/create", book_instance_controller.bookinstance_create_post);

// //DELETE BOOK INSTANCE
// router.get("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_get);
// router.post("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_post);

// //UPDATE BOOK INSTANCE
// router.get("/bookinstance/:id/update", book_instance_controller.bookinstance_update_get);
// router.post("/bookinstance/:id/update", book_instance_controller.bookinstance_update_post);

// //FOR ONE BOOK INSTANCE
// router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

// //FOR ALL BOOK INSTANCES
// router.get("/bookinstances", book_instance_controller.bookinstance_list);

// module.exports = router;