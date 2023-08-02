const express = require("express");
const {
    addpayment,
    verfiypayment
} = require("../controllers/paymentController");
const { isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/payment").post(isAuthenticatedUser,addpayment);
router.route("/verify").post(isAuthenticatedUser,verfiypayment);


module.exports = router;
