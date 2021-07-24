const express = require("express").Router();


const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
// const cors = require("cors");
const httpproxymid = require("http-proxy-middleware");
// const knex = require('knex');
const Sequelize = require("sequelize");


const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');



const app = express();
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  next();

})

app.use('/dev', require('./routes/dev'));


/**  Route plan
 * root /
 * /Signin whcih wil POST and respond with success or fail always POST to prevent man in the middle attacks.
 * /SignOut whcih wil
 * /register whcih wil POST and respond with new user
 * /profile/ :userID GET user
 * /image PUT user
 *
 */

express.get("/", (req, res) => {res.send("It works");});

// dependencie injection
app.post("/signin", (req, res) => {signin.handleSignin(db, bcrypt)});
// app.post("/signin", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json('incorrect form submission');
// }
//   db.select('email', 'hash').from('login')
//   .where('email', '=', email)
//   .then(data => {
//     const isValid = bcrypt.compareSync(password, data[0].hash);
//     if (isValid) {
//       return db.select('*').from('users')
//         .where('email', '=', email)
//         .then(user => {
//           res.json(user[0])
//         })
//         .catch(err => res.status(400).json('unable to get user'))
//     } else {
//       res.status(400).json('wrong credentials')
//     }
//   })
//   .catch(err => res.status(400).json('wrong credentials'))
  

// });

app.post("/register", (req, res) =>{ register.handleRegister(req, res, db, bcrypt)});
// app.post("/register", (req, res) => {
//   const { email, name, password } = req.body;
// if (!name || !email || !password) {
//   return res.status(400).json('incorrect form submission');
// }
//   const hash = bcrypt.hashSync(password);
//     db.transaction(trx => {
//       trx.insert({
//         hash: hash,
//         email: email
//       })
//       .into('login')
//       .returning('email')
//       .then(loginEmail => {
//         return trx('users')
//           .returning('*')
//           .insert({
//             email: loginEmail[0],
//             name: name,
//             joined: new Date()
//           })
//           .then(user => {
//             res.json(user[0]);
//           })
//       })
//       .then(trx.commit)
//       .catch(trx.rollback)
//     })
//     .catch(err => res.status(400).json('unable to register'))
// });



app.get("/profile/:id", (req, res) =>{ profile.handleProfileGet(req, res, db)});
// app.get("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   db.select('*').from('users').where({id})
//     .then(user => {
//       if (user.length) {
//         res.json(user[0])
//       } else {
//         res.status(400).json('Not found')
//       }
//     })
//     .catch(err => res.status(400).json('error getting user'))
// });

app.put("/image", (req, res) =>{ image.handleImagePut(req, res, db)});
app.post("/imageurl", (req, res) =>{ image.handleAPICall(req, res)});

// app.put('/image', (req, res) => {
//     const { id } = req.body;
// db('users').where('id', '=', id)
//   .increment('entries', 1)
//   .returning('entries')
//   .then(entries => {
//     res.json(entries[0]);
//   })
//   .catch(err => res.status(400).json('unable to get entries'))

// })

// needs to be dynamic for environment
try {
  const Port = process.env.EXTERNAL_PORT;

  app.listen( Port || 3000, () => {
    console.log(`listening on port ${Port} `);

  }) ;
} catch (error) {
  console.error(error);

}

  // const Port = process.env.PORT;
// app.listen(Port || 3000, () => {
  // console.log(`listening on port 3000 `);
//   console.log(`listening on port ${Port} `);
// });

