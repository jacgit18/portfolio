const Sequelize = require("sequelize");

// get environment variables
const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    // process.env.PGDATABASE,
    // process.env.PGUSER,
    // process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }

);


module.exports = sequelize;