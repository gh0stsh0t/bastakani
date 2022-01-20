var express = require("express");
var router = express.Router();
const middleware = require("../middleware");
const authJwt = middleware.authJWT;
const application = require("../controllers/application.controller");

/* GET users listing. */
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], application.findAll);
// router.post("/approve", users.approveAll);
router.post("/", [authJwt.verifyToken], application.deleteAll);

module.exports = router;
