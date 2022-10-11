module.exports = (sequelize, Sequelize) => {
  const Ethnicity = sequelize.define("ethnicity", {
    language: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    race: {
      type: Sequelize.STRING,
    },
  });

  return Ethnicity;
};
