const db = require("../models");
const Background = db.background;
const FirstName = db.firstName;
const Surname = db.surname;

const Gender = {
  Male: "male",
  Female: "female",
  NonBinary: "non-binary",
  Unisex: "unisex",
};

const Orientation = {
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

// POST request to add background
exports.addBackground = (req, res) => {
  Background.create({
    language: req.body.language,
    race: req.body.race,
  })
    .then((bg) => {
      res.send({ message: "Language " + bg.language + " added!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// POST request to add first name
exports.addFirstName = async (req, res) => {
  const currBg = await Background.findOne({
    where: { language: req.body.language },
  });
  if (currBg === null) {
    res.status(500).send({ message: "Language not in table yet." });
  } else {
    try {
      const name = await FirstName.create({
        firstName: req.body.firstName,
        gender: req.body.gender,
        language: req.body.language,
      });
      await currBg.hasFirstName(name);
      currBg.getFirstName().then((bg) => {
        res.send({
          message: "First name " + name.firstName + " added!",
          background: bg,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
};

// POST request to add last name
exports.addSurname = async (req, res) => {
  const currBg = await Background.findOne({
    where: { language: req.body.language },
  });
  if (currBg === null) {
    res.status(500).send({ message: "Language not in table yet." });
  } else {
    try {
      const name = await Surname.create({
        surname: req.body.surname,
        gender: req.body.gender,
        language: req.body.language,
      });
      await currBg.hasSurname(name);
      currBg.getSurname().then((bg) => {
        res.send({
          message: "Last name " + name.surname + " added!",
          background: bg,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
};
