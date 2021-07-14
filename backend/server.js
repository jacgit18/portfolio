const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require('knex');

const db = knex({
  client: 'pgsql',
  connection: process.env.POSTGRES_URI 

  // connection: {
  //   host : '127.0.0.1',
  //   user : '',
  //   password : 'test',
  //   database : 'portfolio'
  // }
  // pool: {
  //   min : 2,
  //   max : 10,
  // },
  // migrations: {
  //   tableName: 'postgres'
  // }
});

db.select('*').from('users').then(data =>{
  console.log(data);
});

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

const dataBase = {
  user: [
    {
      id: "123",
      name: "Joshua",
      email: "joshuacarpentier21@gmail.com",
      password: "cook",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Jim",
      email: "jim@example.com",
      password: "look",
      entries: 0,
      joined: new Date(),
    },
  ],
};
/**  Route plan
 * root /
 * /Signin whcih wil POST and respond with success or fail always POST to prevent man in the middle attacks.
 * /SignOut whcih wil
 * /register whcih wil POST and respond with new user
 * /profile/ :userID GET user
 * /image PUT user
 *
 */

app.get("/", (req, res) => {
  res.send(dataBase.user);
});

app.post("/signin", (req, res) => {
//     bcrypt.compare("cook", '$2a$10$TmnSKQGgEfZvNariYdDv5.QjcJSdqmh2LppbnPIJ23IpQIiuBHh5y', function(err, res) {
// console.log("first guess", res);  
  // });
    // bcrypt.compare("not_bacon", hash, function(err, res) {
    //     // res === false
    // });
    
  // if (
  //   req.body.email === dataBase.user[0].email &&
  //   req.body.password === dataBase.user[0].password
  // ) {
  //   res.json(dataBase.users[0]);

  // } else {
  //   res.status(400).json("error we tried");
  // }

  db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    if (isValid) {
      return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user => {
          res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('wrong credentials')
    }
  })
  .catch(err => res.status(400).json('wrong credentials'))
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         console.log(hash);
//     });
// });

  // dataBase.user.push({
  //   id: "125",
  //   name: name,
  //   email: email,
  //   entries: 0,
  //   joined: new Date(),
  // });
  // res.json(dataBase.user[dataBase.user.length - 1]);

  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))

});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  // let found = false;
  // dataBase.user.forEach(user => {
  //   if (user.id === id) {
  //       found = true;
  //    return res.json(user);
  //   } 
  // })
  // if(!found) {
  //     res.status(400).json('not found');
  // }

  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))

});

app.put('/image', (req, res) => {
    const { id } = req.body;
//   let found = false;
//   dataBase.user.forEach((user) => {
//     if (user.id === id) {
//         found = true;
//         user.entries++;
//      return res.json(user.entries);
//     } 
//   })
//   if(!found) {
//     res.status(400).json('not found');
// }

db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))

})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
