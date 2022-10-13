module.exports = (sequelize, Sequelize) => {
  const Surname = sequelize.define("surname", {
    surname: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
  });

  return Surname;
};
