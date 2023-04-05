const async = require('async');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');
 
// const Book = require('../models/book');
// const Author = require("../models/author");

exports.index = function(req, res, next) {
  res.render("index",{
    title: "Smart Prepaid Water Meter",
  });
};

exports.customer_list = function(req, res, next) {
  res.send("all customers. Not implemented");
};

exports.customer_details = function(req, res, next) {
  res.send("customer details. Not implemented");
};

exports.buy_token_get = function(req, res, next) {
  res.render("buy_token_form",{
    title: "Smart repaid Water Meter",
    aux_title: "Buy water units",

  });
};

exports.buy_token_post = function(req, res, next) {
  var rand1 = Math.random() * 10000;
  rand1 = Math.trunc(rand1);
  var rand2 = Math.random() * 10000;
  rand2 = Math.trunc(rand2);
  var rand3 = Math.random() * 10000;
  rand3 = Math.trunc(rand3);
  var rand4 = Math.random() * 10000;
  rand4 = Math.trunc(rand4);

  const units_bought = rand1.toString() + " " + rand2.toString() + " " + rand3.toString() + " " + rand4.toString();
  
  // res.send("units " + units_bought.toString());

  res.render("buy_success", {
    title: "success",
    units: units_bought,
  });
};

exports.available_token = function(req, res, next) {
  res.send("bought tokens: Not implemented");
};

exports.create_customer_get = function(req, res, next) {
  res.send("create customer. Not implemented");
};

exports.delete_customer = function (req, res, next) {
  res.send("delete customer get. Not implemented");
};

exports.create_customer_post = function(require, res, next) {
  res.send("create customer post. Not implemented");
};

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