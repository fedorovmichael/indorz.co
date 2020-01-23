var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('GET - send gift card to user');
})

router.post('/send_coupon', function(req, res, next) {
  const user = JSON.parse(req.body.data)
  console.log('')
  console.log('##########################/ send gift catd to user /#############################')
  console.log('')
  console.log('send gift catd to user: ')
  console.log(user)
  console.log('') 
  console.log('##########################/ send gift catd to user /#############################')
  console.log('')
  res.send('send gift card to user');
});


module.exports = router;
