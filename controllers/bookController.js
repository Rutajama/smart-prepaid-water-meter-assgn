// // const { body, validationResult } = require("express-validator");

// // const Author = require("../models/author");
// // const Book = require("../models/book");
// // const Genre = require("../models/genre");
// // const BookInstance = require("../models/bookinstance");

// // const async = require("async");

// // const BookController = require("../models/book");
// // const { getMaxListeners } = require('../models/author');
// // const book = require('../models/book');

// // exports.index = (req, res) => {
// //   async.parallel(
// //     {
// //       book_count(callback) {
// //         Book.countDocuments({}, callback);
// //       },
// //       book_instance_count(callback) {
// //         BookInstance.countDocuments({}, callback);
// //       },
// //       book_instance_available_count(callback) {
// //         BookInstance.countDocuments({status: "Available"}, callback);
// //       },
// //       author_count(callback) {
// //         Author.countDocuments({}, callback);
// //       },
// //       genre_count(callback) {
// //         Genre.countDocuments({}, callback);
// //       }
// //     },
// //     (err, results) => {
// //       res.render("index", {
// //         title: "local library home",
// //         error: null,
// //         data: results
// //       });
// //     }
// //   );
// // };

// // exports.book_list = (req, res, next) => {
// //   Book.find({}, "title author")
// //   .sort({title: 1})
// //   .populate("author")
// //   .exec(function(err, list_books) {
// //     if(err) {
// //       return next(err);
// //     }
// //     res.render("book_list", {title: "Book List", book_list: list_books});
// //   });
// // };

// // exports.book_detail = (req, res, next) => {
// //   async.parallel(
// //     {
// //       books(callback) {
// //         Book.findById(req.params.id)
// //           .populate("author")
// //           .populate("genre")
// //           .exec(callback)
// //       },
// //       book_instances(callback) {
// //         BookInstance.find( {book: req.params.id} ).exec(callback);
// //       },
// //     },
// //     (err, results) => {
// //       // res.send(results.books)
// //       if(err) {
// //         return next(err);
// //       }
// //       if(results.books == null) {
// //         const err = new Error("book not found");
// //         err.status = 404;
// //         return next(err);
// //       }
// //       res.render("book_detail", {
// //         title: results.books.title,
// //         book: results.books,
// //         book_instance: results.book_instances,
// //       });
// //     }
// //   );
// // };

// // exports.book_create_get = (req, res, next) => {
// //   async.parallel(
// //     {
// //       authors(callback) {
// //         Author.find(callback);
// //       },
// //       genres(callback) {
// //         Genre.find(callback);
// //       },
// //     },
// //     (err, results) => {
// //       if(err) {
// //         return next(err);
// //       }
// //       res.render("book_form", {
// //         title: "Create book",
// //         authors: results.authors,
// //         genres: results.genres,
// //       });
// //     }
// //   );
// // };

// // exports.book_create_post = [
// //   (req, res, next) => {
// //     if(!(req.body.genre instanceof Array)){ //if genre is not instance of array
// //       req.body.genre = typeof req.body.genre === "undefined" ? [] : new Array(req.body.genre);
// //     }
// //     next();
// //   },
// //   body("title", "title must not be empty").trim().isLength( {min: 1}).escape(),
// //   body("author", "author must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("summary", "summary must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("isbn", "ISBM=N must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("genre.*").escape(),

// //   (req, res, next) => {
// //     const errors = validationResult(req);
// //     var book = new Book({ 
// //       title: req.body.title,
// //       author: req.body.author,
// //       summary: req.body.summary,
// //       isbn: req.body.isbn,
// //       genre: req.body.genre,
// //     });
// //     if(!errors.isEmpty()) {
// //       async.parallel(
// //         {
// //           authors(callback) {
// //             Author.find(callback);
// //           },
// //           genres(callback) {
// //             Genre.find(callback);
// //           },
// //         },
// //         (err, results) => {
// //           if(err) {
// //             return next(err);
// //           }
// //           //mark selected genres as checked
// //           for(const genre of results.genres) {
// //             if(book.genre.includes(genre._id)) {
// //               genre.checked = "true";
// //             }
// //           }
// //           res.render("book_form", {
// //             title: "Create book",
// //             authors: results.authors,
// //             genres: results.genres,
// //             book,
// //             errors: errors.array(),
// //           });
// //         }
// //       );
// //       return;
// //     }
// //     //data fromf the form is valid so save the book
// //     const async = require('async');
// const mongoose = require('mongoose');
// const {body, validationResult} = require('express-validator');

// const Book = require('../models/book');
// const Author = require("../models/author");

// exports.author_list = function(req, res, next) {
//   Author.find()
//   .sort([["family_name","ascending"]])
//   .exec(function(err, list_authors){
//     if(err){
//       return next(err);
//     }
//     res.render("author_list", {
//       title: "Author list",
//       author_list: list_authors
//     });
//   });
// };
// exports.author_detail = (req, res, next) => {
//   const id = mongoose.Types.ObjectId(req.params.id);
//   async.parallel(
//     {
//       author(callback) {
//         Author.findById(id).exec(callback);
//       },
//       author_books(callback) {
//         Book.find( {author: id}, "title summary" ).exec(callback);
//       }
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.author == null) {
//         const err = new Error('Author not found');
//         err.status = 404;
//         return next(err);
//       }
//       console.log(`author details: ${JSON.stringify(results)}`);
//       res.render("author_detail",{
//         title: "Author detail",
//         author: results.author,
//         author_book: results.author_books
//       });
//     }
//   );
// };
// exports.author_create_get = (req, res, next) => {
//   res.render("author_form", { title: "Create author"});
// };
// exports.author_create_post = [
//   body("first_name")
//     .trim()
//     .isLength( {min: 1} )
//     .escape()
//     .withMessage("first name is missing")
//     .isAlphanumeric()
//     .withMessage("fist name has none alphanumeric letter"),
//   body("family_name")
//     .trim()
//     .isLength( {min: 1} )
//     .escape()
//     .withMessage("family name is missing")
//     .isAlphanumeric()
//     .withMessage("family name has none alphanumeric letter"),
//   body("date_of_birth","invalid date of birth")
//     .optional( {checkFalsy: true} )
//     .isISO8601()
//     .toDate(),
//   body("date_of_death","invalid date of death")
//     .optional( {checkFalsy: true} )
//     .isISO8601()
//     .toDate(),
//   (req, res, next) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()) {
//       res.render("author_form", {
//         title: "Create author",
//         author: req.body,
//         errors: errors.array()
//       });
//       return;
//     }
//     //data is valid
//     const author = new Author({
//       first_name: req.body.first_name,
//       family_name: req.body.family_name,
//       date_of_birth: req.body.date_of_birth,
//       date_of_death: req.body.date_of_death,
//     });
//     author.save((err) => {
//       if(err) {
//         return next(err);
//       }
//       res.redirect(author.url);
//     });
//   },
// ];

// exports.author_delete_get = (req, res, next) => {
//   async.parallel( 
//     {
//       author(callback) {
//         Author.findById(req.params.id).exec(callback);
//       },
//       authors_books(callback) {
//         Book.find( {author: req.params.id}).exec(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.author == null) {
//         res.redirect("/catalog/authors");
//       }
//       res.render("author_delete", {
//         title: "Delete author",
//         author: results.author,
//         author_books: results.authors_books,
//       });
//     }
//   );
// };

// exports.author_delete_post = (req, res, next) => {
//   async.parallel(
//     {
//       author(callback) {
//         Author.findById(req.body.authorid).exec(callback);
//       },
//       authors_books(callback) {
//         Book.find( {author: req.body.authorid}).exec(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.authors_books.length > 0) {
//         res.render("author_delete" , {
//           title: "Delete author",
//           author: results.author,
//           author_books: results.authors_books,
//         });
//         return;
//       }
//       Author.findByIdAndRemove(req.body.authorid, (err) => {
//         if(err) {
//           return next(err);
//         }
//         res.redirect("/catalog/authors");
//       });
//     }
//   );
// };

// exports.author_update_get = (req, res) => {
//   res.send("NOT IMPLEMENTED. Author update GET");
// };

// exports.author_update_post = (req, res) => {
//   res.send("NOT IMPLEMENTED. Author update POST");
// };

// // ];

// // exports.book_delete_get = (req, res, next) => {
// //   async.parallel( 
// //     {
// //       books(callback) {
// //         Book.findById(req.params.id).exec(callback);
// //       },
// //       bookinstances(callback) {
// //         BookInstance.find( {book: req.params.id} ).exec(callback);
// //       },
// //     },
// //     (err, results) => {
// //       if(err) {
// //         return next(err);
// //       }
// //       if(results.books == null) { //no book of succh id
// //         res.redirect("/catalog/books");
// //       }
// //       res.render("book_delete", {
// //         title: "Delete book:",
// //         bookinstances_list: results.bookinstances,
// //         book: results.books
// //       });
// //     }
// //   );
// // };
// // exports.book_delete_post = (req, res) => {
// //   // res.send(req.body)
// //   Book.findByIdAndDelete(req.body.bookId, (err) => {
// //     if(err) {
// //       return next(err);
// //     }
// //     //deleted! now redirect
// //     res.redirect("/catalog/books");
// //   });
// // };

// // exports.book_update_get = (req, res, nexts) => {
// //   async.parallel(
// //     {
// //       book(callback) {
// //         Book.findById(req.params.id)
// //           .populate("author")
// //           .populate("genre")
// //           .exec(callback)
// //       },
// //       authors(callback) {
// //         Author.find(callback);
// //       },
// //       genres(callback) {
// //         Genre.find(callback);
// //       },
// //     },
// //     (err, results) => {
// //       if(err) {
// //         return next(err);
// //       }
// //       if(results.book == null) {
// //         const error = new Error("Book not found");
// //         error.status = 404;
// //         return next(error);
// //       }
// //       for(const genre of results.genres) {
// //         for(const bookGenre of results.book.genre) {
// //           if(genre._id.toString() == bookGenre._id.toString()) {
// //             genre.checked = "true";
// //           }
// //         }
// //       }
// //       res.render("book_form", {
// //         title: "Update book",
// //         authors: results.authors,
// //         genres: results.genres,
// //         book: results.book,
// //       });
// //     }
// //   );
// // };
// // exports.book_update_post = [
// //   (req, res, next) => {
// //     if(!(Array.isArray(req.body.genre))) {
// //       req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
// //     }
// //     next();
// //   },
// //   body("title", "Title  must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("author", "Author must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("summary", "Summary must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("isbn", "ISBN must not be empty").trim().isLength( {min:1} ).escape(),
// //   body("genre.*").escape(),

// //   (req, res, next) => {
// //     const errors = validationResult(req);

// //     const book = new Book({
// //       title:  req.body.title,
// //       author: req.body.author,
// //       summary: req.body.summary,
// //       isbn: req.body.isbn,
// //       genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
// //       _id: req.params.id,
// //     });
// //     // res.send(book.genre)
// //     if(!errors.isEmpty()) { //there are errors so render form again
// //       //get all autors and genres
// //       async.parallel(
// //         {
// //           authors(callback) {
// //             Author.find(callback);
// //           },
// //           genres(callback) {
// //             Genre.find(callback)
// //           },
// //         },
// //         (err, results) => {
// //           if(err) {
// //             return next(err);
// //           }
// //           //mark selected genres from preious form as selected
// //           for(const genre of results.genres) {
// //             if(book.genre.includes(genre._id)) {
// //               genre.checked = "true";
// //             }
// //           }
// //           res.render("book_form", {
// //             title: "Update book",
// //             authors: results.authors,
// //             genres: results.genres,
// //             book,
// //             errors: errors.array(),
// //           });
// //         }
// //       );
// //       return;
// //     }
// //     //no errors proceed with updating
// //     Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
// //       if(err) {
// //         return next(err);
// //       }
// //       res.redirect(thebook.url);
// //     });
// //   },
// // ];
