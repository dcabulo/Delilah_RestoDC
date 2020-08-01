const { MysqlConfig } = require("../environments/development").config;
const { Sequelize } = require("sequelize");

const mySqlSequelize = new Sequelize(
    MysqlConfig.Db,
    MysqlConfig.User,
    MysqlConfig.Password, {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
    Port:3306,
}
);

mySqlSequelize.sync({ force: false })
    .then(() => {
        console.log("database and tables sync");
    }).catch((err) => {
        console.log(`Couldnt sync tables, error=>${err}`)
    })

module.exports = { mySqlSequelize }

