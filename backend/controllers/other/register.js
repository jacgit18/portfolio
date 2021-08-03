const handleRegister = (req, res, db, bcrypt) => {
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
  
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission');
    }
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
  
  };
  

module.exports = {handleRegister: handleRegister};