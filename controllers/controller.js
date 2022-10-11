const db = require("../models");
const Ethnicity = db.ethnicity;
const FirstName = db.firstName;
const LastName = db.lastName;

const Gender = {
  Male: "male",
  Female: "female",
  NonBinary: "non-binary",
  Unisex: "unisex",
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
    language: req.body.language,
    race: req.body.race,
  })
    .then((eth) => {
      res.send({ message: "Ethnicity " + eth.language + " added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// POST request to add first name
exports.addFirstName = async (req, res) => {
  const currEthnicity = await Ethnicity.findOne({
    where: { language: req.body.language },
  });
  if (currEthnicity === null) {
    res.status(500).send({ message: "Ethnicity not in table yet." });
  } else {
    try {
      const name = await FirstName.create({
        firstname: req.body.firstname,
        gender: req.body.gender,
        language: req.body.language,
      });
      await currEthnicity.hasFirstName(name);
      currEthnicity.getFirstName().then((eth) => {
        res.send({
          message: "First name " + name.firstname + " added!",
          ethnicList: eth,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
};
// POST request to add last name
exports.addLastName = async (req, res) => {
  const currEthnicity = await Ethnicity.findOne({
    where: { language: req.body.language },
  });
  if (currEthnicity === null) {
    res.status(500).send({ message: "Ethnicity not in table yet." });
  } else {
    try {
      const name = await LastName.create({
        lastname: req.body.lastname,
        gender: req.body.gender,
        language: req.body.language,
      });
      await currEthnicity.hasLastName(name);
      currEthnicity.getLastName().then((eth) => {
        res.send({
          message: "Last name " + name.lastname + " added!",
          ethnicList: eth,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
};
