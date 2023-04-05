// const { body, validationResult } = require("express-validator");

// const Author = require("../models/author");
// const Book = require("../models/book");
// const Genre = require("../models/genre");
// const BookInstance = require("../models/bookinstance");

// const async = require("async");

// const BookController = require("../models/book");
// const { getMaxListeners } = require('../models/author');
// const book = require('../models/book');

// exports.index = (req, res) => {
//   async.parallel(
//     {
//       book_count(callback) {
//         Book.countDocuments({}, callback);
//       },
//       book_instance_count(callback) {
//         BookInstance.countDocuments({}, callback);
//       },
//       book_instance_available_count(callback) {
//         BookInstance.countDocuments({status: "Available"}, callback);
//       },
//       author_count(callback) {
//         Author.countDocuments({}, callback);
//       },
//       genre_count(callback) {
//         Genre.countDocuments({}, callback);
//       }
//     },
//     (err, results) => {
//       res.render("index", {
//         title: "local library home",
//         error: null,
//         data: results
//       });
//     }
//   );
// };

// exports.book_list = (req, res, next) => {
//   Book.find({}, "title author")
//   .sort({title: 1})
//   .populate("author")
//   .exec(function(err, list_books) {
//     if(err) {
//       return next(err);
//     }
//     res.render("book_list", {title: "Book List", book_list: list_books});
//   });
// };

// exports.book_detail = (req, res, next) => {
//   async.parallel(
//     {
//       books(callback) {
//         Book.findById(req.params.id)
//           .populate("author")
//           .populate("genre")
//           .exec(callback)
//       },
//       book_instances(callback) {
//         BookInstance.find( {book: req.params.id} ).exec(callback);
//       },
//     },
//     (err, results) => {
//       // res.send(results.books)
//       if(err) {
//         return next(err);
//       }
//       if(results.books == null) {
//         const err = new Error("book not found");
//         err.status = 404;
//         return next(err);
//       }
//       res.render("book_detail", {
//         title: results.books.title,
//         book: results.books,
//         book_instance: results.book_instances,
//       });
//     }
//   );
// };

// exports.book_create_get = (req, res, next) => {
//   async.parallel(
//     {
//       authors(callback) {
//         Author.find(callback);
//       },
//       genres(callback) {
//         Genre.find(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       res.render("book_form", {
//         title: "Create book",
//         authors: results.authors,
//         genres: results.genres,
//       });
//     }
//   );
// };

// exports.book_create_post = [
//   (req, res, next) => {
//     if(!(req.body.genre instanceof Array)){ //if genre is not instance of array
//       req.body.genre = typeof req.body.genre === "undefined" ? [] : new Array(req.body.genre);
//     }
//     next();
//   },
//   body("title", "title must not be empty").trim().isLength( {min: 1}).escape(),
//   body("author", "author must not be empty").trim().isLength( {min:1} ).escape(),
//   body("summary", "summary must not be empty").trim().isLength( {min:1} ).escape(),
//   body("isbn", "ISBM=N must not be empty").trim().isLength( {min:1} ).escape(),
//   body("genre.*").escape(),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     var book = new Book({ 
//       title: req.body.title,
//       author: req.body.author,
//       summary: req.body.summary,
//       isbn: req.body.isbn,
//       genre: req.body.genre,
//     });
//     if(!errors.isEmpty()) {
//       async.parallel(
//         {
//           authors(callback) {
//             Author.find(callback);
//           },
//           genres(callback) {
//             Genre.find(callback);
//           },
//         },
//         (err, results) => {
//           if(err) {
//             return next(err);
//           }
//           //mark selected genres as checked
//           for(const genre of results.genres) {
//             if(book.genre.includes(genre._id)) {
//               genre.checked = "true";
//             }
//           }
//           res.render("book_form", {
//             title: "Create book",
//             authors: results.authors,
//             genres: results.genres,
//             book,
//             errors: errors.array(),
//           });
//         }
//       );
//       return;
//     }
//     //data fromf the form is valid so save the book
//     book.save( (err) => {
//       if(err) {
//         return next(err);
//       }
//       res.redirect(book.url);
//     });
//   },
// ];

// exports.book_delete_get = (req, res, next) => {
//   async.parallel( 
//     {
//       books(callback) {
//         Book.findById(req.params.id).exec(callback);
//       },
//       bookinstances(callback) {
//         BookInstance.find( {book: req.params.id} ).exec(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.books == null) { //no book of succh id
//         res.redirect("/catalog/books");
//       }
//       res.render("book_delete", {
//         title: "Delete book:",
//         bookinstances_list: results.bookinstances,
//         book: results.books
//       });
//     }
//   );
// };
// exports.book_delete_post = (req, res) => {
//   // res.send(req.body)
//   Book.findByIdAndDelete(req.body.bookId, (err) => {
//     if(err) {
//       return next(err);
//     }
//     //deleted! now redirect
//     res.redirect("/catalog/books");
//   });
// };

// exports.book_update_get = (req, res, nexts) => {
//   async.parallel(
//     {
//       book(callback) {
//         Book.findById(req.params.id)
//           .populate("author")
//           .populate("genre")
//           .exec(callback)
//       },
//       authors(callback) {
//         Author.find(callback);
//       },
//       genres(callback) {
//         Genre.find(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.book == null) {
//         const error = new Error("Book not found");
//         error.status = 404;
//         return next(error);
//       }
//       for(const genre of results.genres) {
//         for(const bookGenre of results.book.genre) {
//           if(genre._id.toString() == bookGenre._id.toString()) {
//             genre.checked = "true";
//           }
//         }
//       }
//       res.render("book_form", {
//         title: "Update book",
//         authors: results.authors,
//         genres: results.genres,
//         book: results.book,
//       });
//     }
//   );
// };
// exports.book_update_post = [
//   (req, res, next) => {
//     if(!(Array.isArray(req.body.genre))) {
//       req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
//     }
//     next();
//   },
//   body("title", "Title  must not be empty").trim().isLength( {min:1} ).escape(),
//   body("author", "Author must not be empty").trim().isLength( {min:1} ).escape(),
//   body("summary", "Summary must not be empty").trim().isLength( {min:1} ).escape(),
//   body("isbn", "ISBN must not be empty").trim().isLength( {min:1} ).escape(),
//   body("genre.*").escape(),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     const book = new Book({
//       title:  req.body.title,
//       author: req.body.author,
//       summary: req.body.summary,
//       isbn: req.body.isbn,
//       genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
//       _id: req.params.id,
//     });
//     // res.send(book.genre)
//     if(!errors.isEmpty()) { //there are errors so render form again
//       //get all autors and genres
//       async.parallel(
//         {
//           authors(callback) {
//             Author.find(callback);
//           },
//           genres(callback) {
//             Genre.find(callback)
//           },
//         },
//         (err, results) => {
//           if(err) {
//             return next(err);
//           }
//           //mark selected genres from preious form as selected
//           for(const genre of results.genres) {
//             if(book.genre.includes(genre._id)) {
//               genre.checked = "true";
//             }
//           }
//           res.render("book_form", {
//             title: "Update book",
//             authors: results.authors,
//             genres: results.genres,
//             book,
//             errors: errors.array(),
//           });
//         }
//       );
//       return;
//     }
//     //no errors proceed with updating
//     Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
//       if(err) {
//         return next(err);
//       }
//       res.redirect(thebook.url);
//     });
//   },
// ];
