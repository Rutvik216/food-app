const express = require("express");
const { testUserController } = require("../controllers/testController");

//router object
const router = express.Router();

//router GET/POST/UPDATE/DELETE
router.get("/test-user", testUserController);
// router.get("/test-user", (req, res, next) => {
//   return res.status(200).send(`<h1>Everything working fine . </h1>`);
// });
//export
module.exports = router;
