module.exports = (sequelize, Sequelize) => {
  const LastName = sequelize.define("last_name", {
    lastname: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
  });

  return LastName;
};
