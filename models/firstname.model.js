module.exports = (sequelize, Sequelize) => {
  const FirstName = sequelize.define("first_name", {
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
