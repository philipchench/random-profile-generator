module.exports = (sequelize, Sequelize) => {
  const ProfileMain = sequelize.define("profile_main", {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    ethnicity: {
      type: Sequelize.STRING,
    },
  });

  return ProfileMain;
};
