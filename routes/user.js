const express = require("express");
const { verify } = require("../auth");
const { login, register, getUserDetail } = require("../controllers/user");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/details", verify, getUserDetail);

module.exports = router;
