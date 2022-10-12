module.exports = (sequelize, Sequelize) => {
  const FirstName = sequelize.define("firstname", {
    firstName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
  });

  return FirstName;
};
