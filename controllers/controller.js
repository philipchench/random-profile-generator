const db = require("../models");
const { Op } = require("sequelize");
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

// GET request to generate random profile
exports.generateProfile = async (req, res) => {
  switch (parseInt(req.params.score)) {
    case 1:
      handleOne(req, res);
      break;
    case 2:
      handleTwo(req, res);
      break;
    case 3:
      res.send("case " + req.params.score);
      break;
    case 4:
      res.send("case " + req.params.score);
      break;
    case 5:
      res.send("case " + req.params.score);
      break;
    default:
      res.status(400).send("Bad input");
  }
};

const handleOne = async (req, res) => {
  try {
    // get first name
    FirstName.findAll({
      where: {
        language: "Basic",
        gender: "male",
      },
    }).then((names) => {
      // pick random name
      const name = names[Math.floor(Math.random() * names.length)];
      // get surname
      Surname.findAll({
        where: { language: "Basic" },
      }).then((surnames) => {
        const surname = surnames[Math.floor(Math.random() * surnames.length)];
        res.json({
          firstname: name.firstName,
          surname: surname.surname,
          gender: name.gender,
          race: "White",
          sexOr: Orientation.Heterosexual,
          score: req.params.score,
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleTwo = async (req, res) => {
  try {
    // get background
    Background.findAll({
      where: {
        [Op.or]: [{ race: "Asian" }, { race: "White" }],
      },
    }).then((politicallyIncorrectBgs) => {
      // pick random background
      const bg =
        politicallyIncorrectBgs[
          Math.floor(Math.random() * politicallyIncorrectBgs.length)
        ];
      // get first name
      FirstName.findAll({
        where: { language: bg.language, gender: "male" },
      }).then((ethnicnames) => {
        FirstName.findAll({
          where: { language: "Basic" },
        }).then((basicnames) => {
          FirstName.findAll({
            where: { language: "English", gender: "male" },
          }).then((englishnames) => {
            const nameList = [ethnicnames, englishnames, basicnames];
            // pick between ethnic name or English name
            const names = nameList[Math.floor(Math.random() * nameList.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            // get surname
            Surname.findAll({
              where: { language: bg.language },
            }).then((surnames) => {
              const surname =
                surnames[Math.floor(Math.random() * surnames.length)];
              res.json({
                firstname: name.firstName,
                surname: surname.surname,
                gender: name.gender,
                race: bg.race,
                sexOr: Orientation.Heterosexual,
                score: req.params.score,
              });
            });
          });
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
