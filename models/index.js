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

db.ethnicity = require("../models/ethnicity.model.js")(sequelize, Sequelize);

db.firstName = require("../models/firstname.model.js")(sequelize, Sequelize);

db.lastName = require("../models/lastname.model.js")(sequelize, Sequelize);

console.log(db.lastName);

module.exports = db;
