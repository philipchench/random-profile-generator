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

const races = ["White", "Black", "Arab", "Asian"];

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
      handleThree(req, res);
      break;
    case 4:
      handleFour(req, res);
      break;
    case 5:
      handleFive(req, res);
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
          transgender: false,
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
          where: { language: "Basic", gender: "female" },
        }).then((basicnames) => {
          FirstName.findAll({
            where: { language: "Basic", gender: "male" },
          }).then((malebasicnames) => {
            var nameList = [ethnicnames, malebasicnames];
            // can have white females
            if (bg.race == "White") {
              nameList = [ethnicnames, malebasicnames, basicnames];
            }
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
                transgender: false,
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

const handleThree = async (req, res) => {
  const selectedRace = races[Math.floor(Math.random() * races.length)];
  try {
    // get background
    Background.findAll({ where: { race: selectedRace } }).then(
      (politicallyIncorrectBgs) => {
        // pick random background
        const bg =
          politicallyIncorrectBgs[
            Math.floor(Math.random() * politicallyIncorrectBgs.length)
          ];
        // get first name
        FirstName.findAll({
          where: { language: bg.language },
        }).then((ethnicnames) => {
          FirstName.findAll({
            where: { language: "Basic" },
          }).then((basicnames) => {
            var nameList = [ethnicnames, basicnames];
            // pick between ethnic name or English name
            const names = nameList[Math.floor(Math.random() * nameList.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            // get surname
            Surname.findAll({
              where: { language: bg.language },
            }).then((surnames) => {
              const surname =
                surnames[Math.floor(Math.random() * surnames.length)];
              var sexOri = Orientation.Heterosexual;
              if (
                (Math.random() < 0.2 ||
                  (selectedRace == "White" && name.language == "Basic")) &&
                selectedRace != "Arab"
              ) {
                sexOri =
                  name.gender == "male" ? Orientation.Gay : Orientation.Lesbian;
              }
              res.json({
                firstname: name.firstName,
                surname: surname.surname,
                gender: name.gender,
                race: bg.race,
                sexOr: sexOri,
                transgender:
                  Math.random() < 0.05 && selectedRace != "Arab" ? true : false,
                score: req.params.score,
              });
            });
          });
        });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleFour = async (req, res) => {
  const selectedRace = races[Math.floor(Math.random() * races.length)];
  try {
    // get background
    Background.findAll({ where: { race: selectedRace } }).then(
      (politicallyIncorrectBgs) => {
        // pick random background
        const bg =
          politicallyIncorrectBgs[
            Math.floor(Math.random() * politicallyIncorrectBgs.length)
          ];
        // get first name
        FirstName.findAll({
          where: { language: bg.language },
        }).then((ethnicnames) => {
          FirstName.findAll({
            where: { language: "Basic" },
          }).then((basicnames) => {
            var nameList = [ethnicnames, basicnames];
            // pick between ethnic name or English name
            const names = nameList[Math.floor(Math.random() * nameList.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            // get surname
            Surname.findAll({
              where: { language: bg.language },
            }).then((surnames) => {
              const surname =
                surnames[Math.floor(Math.random() * surnames.length)];
              var sexOri =
                name.gender == "male" ? Orientation.Gay : Orientation.Lesbian;
              const prob = Math.random();
              if (prob < 0.15) {
                sexOri = Orientation.Asexual;
              } else if (prob < 0.2) {
                sexOri = Orientation.Pansexual;
              } else if (prob < 0.35) {
                sexOri = Orientation.Bisexual;
              }
              var gender = name.gender;
              var cannotTrans = false;
              const prob2 = Math.random();
              if (
                prob2 < 0.05 &&
                sexOri != Orientation.Gay &&
                sexOri != Orientation.Lesbian
              ) {
                gender = Gender.Unisex;
                cannotTrans = true;
              } else if (
                prob2 < 0.15 &&
                sexOri != Orientation.Gay &&
                sexOri != Orientation.Lesbian
              ) {
                gender = Gender.NonBinary;
                cannotTrans = true;
              }
              res.json({
                firstname: name.firstName,
                surname: surname.surname,
                gender: gender,
                race: bg.race,
                sexOr: sexOri,
                transgender:
                  Math.random() < 0.25 && cannotTrans == false ? true : false,
                score: req.params.score,
              });
            });
          });
        });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const handleFive = async (req, res) => {
  const selectedRace = races[Math.floor(Math.random() * races.length)];
  try {
    // get background
    Background.findAll({ where: { race: selectedRace } }).then(
      (politicallyIncorrectBgs) => {
        // pick random background
        const bg =
          politicallyIncorrectBgs[
            Math.floor(Math.random() * politicallyIncorrectBgs.length)
          ];
        // get first name
        FirstName.findAll({}).then((names) => {
          const name = names[Math.floor(Math.random() * names.length)];
          // get surname
          Surname.findAll({}).then((surnames) => {
            const surname =
              surnames[Math.floor(Math.random() * surnames.length)];
            var sexOri =
              name.gender == "male" ? Orientation.Gay : Orientation.Lesbian;
            const prob = Math.random();
            if (prob < 0.2) {
              sexOri = Orientation.Asexual;
            } else if (prob < 0.4) {
              sexOri = Orientation.Pansexual;
            } else if (prob < 0.6) {
              sexOri = Orientation.Bisexual;
            }
            var gender = name.gender;
            var cannotTrans = false;
            const prob2 = Math.random();
            if (
              prob2 < 0.1 &&
              sexOri != Orientation.Gay &&
              sexOri != Orientation.Lesbian
            ) {
              gender = Gender.Unisex;
              cannotTrans = true;
            } else if (
              prob2 < 0.35 &&
              sexOri != Orientation.Gay &&
              sexOri != Orientation.Lesbian
            ) {
              gender = Gender.NonBinary;
              cannotTrans = true;
            }
            res.json({
              firstname: name.firstName,
              surname: surname.surname,
              gender: gender,
              race: bg.race,
              sexOr: sexOri,
              transgender:
                Math.random() < 0.5 && cannotTrans == false ? true : false,
              score: req.params.score,
            });
          });
        });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
