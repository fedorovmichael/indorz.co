var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('GET - respond send message');
})

router.post('/send_message', function(req, res, next) {  
  const user = JSON.parse(req.body.data)
  console.log('')
  console.log('##########################/ send user message /#############################')
  console.log('')
  console.log('send message to user: ')
  console.log(user)
  console.log('') 
  console.log('##########################/ send user message /#############################')
  console.log('')
  res.send('respond send message with a resource');
});

module.exports = router;
