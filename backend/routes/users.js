var express = require('express');
var router = express.Router();
const middleware = require("../middleware");
const authJwt = middleware.authJWT;
const users = require("../controllers/users.controller");

/* GET users listing. */
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);
// router.post("/approve", users.approveAll);
router.post(
  "/decline",
  [authJwt.verifyToken, authJwt.isAdmin],
  users.deleteAll
);


module.exports = router;
