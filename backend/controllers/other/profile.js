const handleProfileGet = (req, res, db, bcrypt) => {
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
  
  };
  

module.exports = {handleProfileGet: handleProfileGet};