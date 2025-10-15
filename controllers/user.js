const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createAccessToken } = require("../auth");

module.exports.register = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  let newUser = new User(req.body);

  return newUser
    .save()
    .then((result) => {
      res.status(201).send({
        message: "Registered Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send();
    });
};

module.exports.login = async (req, res) => {
  try {
    console.log("hey ");
    const foundUser = await User.findOne({ email: req.body.email });
    // console.log(foundUser, isPasswordCorrect);
    console.log(foundUser);

    if (!foundUser) return res.status(404).send({ message: "No email found" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (isPasswordCorrect) {
      return res.status(200).send({
        access: createAccessToken(foundUser),
      });
    } else {
      return res.status(401).send({
        auth: "Failed",
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getUserDetail = async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    if (!foundUser) return res.status(400).send({ message: "User not found" });
    res.send(foundUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
