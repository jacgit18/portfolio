const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

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
    
  if (
    req.body.email === dataBase.user[0].email &&
    req.body.password === dataBase.user[0].password
  ) {
    res.json("success we did it");
  } else {
    res.status(400).json("error we tried");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);
    });
});
  dataBase.user.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(dataBase.user[dataBase.user.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  dataBase.user.forEach(user => {
    if (user.id === id) {
        found = true;
     return res.json(user);
    } 
  })
  if(!found) {
      res.status(400).json('not found');
  }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
  let found = false;
  dataBase.user.forEach((user) => {
    if (user.id === id) {
        found = true;
        user.entries++;
     return res.json(user.entries);
    } 
  })
  if(!found) {
    res.status(400).json('not found');
}
})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
