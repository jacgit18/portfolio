const Sequelize = require("sequelize");

// const user = '<jac>'
// const host = 'localhost'
// const database = '<Portfolio>'
// const password = '<test>'
// const port = '<5432>'


const user = 'jac'
const host = 'localhost'
const database = 'Portfolio'
const password = 'test'
const port = '5432'
// import { Sequelize, Model, DataTypes } from 'sequelize'


// get environment variables
const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    // process.env.POSTGRES_DB = postgres,
    // process.env.POSTGRES_USER = postgres,
    // process.env.POSTGRES_PASSWORD = test,
    // process.env.PGDATABASE,
    // process.env.PGUSER,
    // process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }

);

// const sequelize = new Sequelize(database, user, password,
  
//     {
//         host,
//         port,
//         dialect: 'postgres',
//         logging: false
//     }

// );


module.exports = sequelize;