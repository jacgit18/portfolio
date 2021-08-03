const handleSignin = (db, bcrypt) => (req, res) => {
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
}
  db.select('email', 'hash').from('login')
  .where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
      return db.select('*').from('users')
        .where('email', '=', email)
        .then(user => {
          res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('wrong credentials')
    }
  })
  .catch(err => res.status(400).json('wrong credentials'))
  
  };
  

module.exports = {handleSignin: handleSignin};