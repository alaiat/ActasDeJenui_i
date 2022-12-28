var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/aboutus', (rq, res, next) => {
  res.render("aboutus", {logged:false})
})

module.exports = router;
