const db = require("../models");
const ProfileMain = db.profileMain;

// GET request to test return random profileMain entry
exports.randomProfileMain = (req, res) => {
  ProfileMain.findOne({
    order: [db.Sequelize.fn("RANDOM")],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
// POST request to add profile-main entry
exports.addProfileMain = (req, res) => {
  ProfileMain.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    ethnicity: req.body.ethnicity,
  })
    .then((profileMain) => {
      res.send({ message: "profileMain added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
