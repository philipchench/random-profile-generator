const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.background = require("./background.model.js")(sequelize, Sequelize);

db.firstName = require("./firstname.model.js")(sequelize, Sequelize);

db.surname = require("./surname.model.js")(sequelize, Sequelize);

db.background.hasMany(db.firstName, {
  foreignKey: "language",
  as: "FirstName",
});
db.firstName.belongsTo(db.background);
db.background.hasMany(db.surname, {
  foreignKey: "language",
  as: "Surname",
});
db.surname.belongsTo(db.background);

module.exports = db;
