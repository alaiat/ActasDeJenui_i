var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:mode', function(req, res, next) {
  res.render("session", {mode:req.params.mode});
});

module.exports = router;
