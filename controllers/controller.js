const db = require("../models");
const Ethnicity = db.ethnicity;
const FirstName = db.firstName;
const LastName = db.lastName;

const Gender = {
  Male: "male",
  Female: "female",
  NonBinary: "non-binary",
};

const SexOrient = {
  Heterosexual: "heterosexual",
  Gay: "gay",
  Lesbian: "lesbian",
  Bisexual: "bisexual",
  Asexual: "asexual",
  Pansexual: "pansexual",
};

// GET request to test return random profileMain entry
// exports.randomProfileMain = (req, res) => {
//   ProfileMain.findOne({
//     order: [db.Sequelize.fn("RANDOM")],
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

// POST request to add ethnicity
exports.addEthnicity = (req, res) => {
  Ethnicity.create({
    ethnicity: req.body.ethnicity,
    race: req.body.race,
  })
    .then((eth) => {
      res.send({ message: "Ethnicity " + eth.ethnicity + " added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// POST request to add first name
exports.addFirstName = (req, res) => {
  FirstName.create({
    firstname: req.body.firstname,
    gender: req.body.gender,
    ethnicity: req.body.ethnicity,
  })
    .then((name) => {
      res.send({ message: "First name " + name.firstname + " added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// POST request to add last name
exports.addLastName = (req, res) => {
  LastName.create({
    lastname: req.body.lastname,
    gender: req.body.gender,
    ethnicity: req.body.ethnicity,
  })
    .then((name) => {
      res.send({ message: "Last name " + name.lastname + " added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
