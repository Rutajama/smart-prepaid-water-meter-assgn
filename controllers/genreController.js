// var Genre = require("../models/genre");
// var Book = require("../models/book");
// var async = require("async");

// const { body, validationResult } = require("express-validator");

// // Display list of all Genre.
// exports.genre_list = function (req, res, next) {
//   Genre.find()
//     .sort([["name", "ascending"]])
//     .exec(function (err, list_genres) {
//       if (err) {
//         return next(err);
//       }
//       // Successful, so render.
//       res.render("genre_list", {
//         title: "Genre List",
//         genre_list: list_genres,
//       });
//     });
// };

// // Display detail page for a specific Genre.
// exports.genre_detail = function (req, res, next) {
//   async.parallel(
//     {
//       genre: function (callback) {
//         Genre.findById(req.params.id).exec(callback);
//       },
//       genre_books: function (callback) {
//         Book.find({ genre: req.params.id }).exec(callback);
//       },
//     },
//     function (err, results) {
//       if (err) {
//         return next(err);
//       }
//       if (results.genre == null) {
//         // No results.
//         var err = new Error("Genre not found");
//         err.status = 404;
//         return next(err);
//       }
//       // Successful, so render.
//       res.render("genre_detail", {
//         title: "Genre Detail",
//         genre: results.genre,
//         genre_books: results.genre_books,
//       });
//     }
//   );
// };

// // Display Genre create form on GET.
// exports.genre_create_get = function (req, res, next) {
//   // var q = url.parse(req.url, true);
//   // console.log(`get data: ${JSON.stringify(q)}`);
//   res.render("genre_form", { title: "Create Genre" });
// };

// exports.genre_create_post = [
//   body("name", "Genre name must contain at least 3 characters")
//     .trim()
//     .isLength({ min: 3 })
//     .escape(),
//   (req, res, next) => {
//     console.log('here');
//     const errors = validationResult(req);
//     var genre = new Genre({ name: req.body.name });
//     if (!errors.isEmpty()) {
//       res.render("genre_form", {
//         title: "Create Genre",
//         genre: genre,
//         errors: errors.array(),
//       });
//       return;
//     } else {
//       Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
//         if (err) {
//           return next(err);
//         }
//         if (found_genre) {
//           console.log(`'ifsection ${found_genre.url}`);
//           res.redirect(found_genre.url);
//         } else {
//           console.log(`else section ${genre.url}`);
//           genre.save(function (err) {
//             if (err) {
//               return next(err);
//             }
//             res.redirect(genre.url);
//           });
//         }
//       });
//     }
//   },
// ];

// // Display Genre delete form on GET.
// exports.genre_delete_get = function (req, res, next) {
//   //search for requested genre and associated book looking at this particular genre
//   async.parallel(
//     {
//       genres(callback) {
//         Genre.findById(req.params.id).exec(callback);
//       },
//       genre_books(callback) { //books pointing at this genre
//         Book.find( {genre: req.params.id}).exec(callback);
//       },
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.genres == null){
//         res.redirect("/catalog/genres");
//         return;
//       }
//       res.render("genre_delete", {
//         title: "Delete genre",
//         genre: results.genres,
//         books: results.genre_books,
//       });
//     }
//   )
// };

// // Handle Genre delete on POST.
// exports.genre_delete_post = function (req, res, next) {
//   //again find any book pointing to this genre
//   async.parallel(
//     {
//       genres(callback) {
//         Genre.findById(req.body.genre_id).exec(callback);
//       },
//       genre_books(callback) {
//         Book.find( {genre: req.body.genre_id}).exec(callback);
//       }
//     },
//     (err, results) => {
//       if(err) {
//         return next(err);
//       }
//       if(results.genres == null) {  //genre not available
//         res.redirect("/catalog/genres"); 
//         return;
//       }
//       if(JSON.stringify(results.genre_books) == "{}") { //we have related books
//         res.render("genre_delete", {
//           title: "Genre delete",
//           genre: results.genres,
//           book: results.genre_books,
//         });
//         return;
//       }
//       Genre.findByIdAndRemove(req.body.genre_id, (err) => {
//         if(err) {
//           return next(err);
//         }
//         res.redirect("/catalog/genres");
//       });
//     }
//   );
// };

// // Display Genre update form on GET.
// exports.genre_update_get = function (req, res, next) {

// };

// // Handle Genre update on POST.
// exports.genre_update_post = function (req, res, next) {

// };
