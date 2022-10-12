module.exports = (sequelize, Sequelize) => {
  const Background = sequelize.define("background", {
    language: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    race: {
      type: Sequelize.STRING,
    },
  });

  return Background;
};
