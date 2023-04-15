const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.redirect("/catalog");
// });

const customer_controller = require("../controllers/customerController");

router.get("/", customer_controller.index);;

router.get("/customers", customer_controller.customer_list);

router.get("/customer/create", customer_controller.create_customer_get);
router.post("/customer/create", customer_controller.create_customer_post);

router.get("/customer/:id/detail", customer_controller.customer_details);

router.get("/customer/:id/token", customer_controller.available_token);

router.get("/tokens", customer_controller.fetch_token);

// router.get("/customer/:id/token/buy", customer_controller.buy_token);
router.get("/token/buy", customer_controller.buy_token_get);
router.post("/token/buy", customer_controller.buy_token_post);

router.get("/transactions", customer_controller.show_transactions);
module.exports = router;
