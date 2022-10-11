module.exports = (sequelize, Sequelize) => {
  const FirstName = sequelize.define("first_name", {
    firstname: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    ethnicity: {
      type: Sequelize.STRING,
    },
  });

  return FirstName;
};
