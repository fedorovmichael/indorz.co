const express = require('express');
const router = express.Router();
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", (req, res) =>{ 
  
  console.log("login input params: ",  req.body);
  let login = JSON.parse(req.body.data)
  let user = JSON.parse(login.userdb)
  console.log("login object: ",  login);
  console.log("user object: ",  user);
  let response = {success: true, message: "Success login user", data: user}

  if(login.login == user.email && bcrypt.compareSync(login.password, user.password)){
    console.log("login success")
  }else{
    response.success = false;
    response.message = 'Failed login user'
    response.data = null
  }

  res.send(response);
});

router.post('/registration', function(req, res, next) {  
  let user = JSON.parse(req.body.data)
  console.log("input params: ",  user);
  user.id = uuid.v1()
  user.password = bcrypt.hashSync(user.password);
  res.send({success: true, message: "Success create user", data: user});
});

module.exports = router;
