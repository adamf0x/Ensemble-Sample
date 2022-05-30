const Sequelize = require("sequelize");
const db = {};
//use the db configuration for the proper environment i.e. test or dev
const config = require("../../config/config.json")[process.env.NODE_ENV?process.env.NODE_ENV:"dev"];

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

module.exports = db;