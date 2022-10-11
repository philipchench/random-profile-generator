module.exports = (sequelize, Sequelize) => {
  const Ethnicity = sequelize.define("ethnicity", {
    ethnicity: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    race: {
      type: Sequelize.STRING,
    },
  });

  return Ethnicity;
};
