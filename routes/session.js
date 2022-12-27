var express = require('express');
var router = express.Router();
const session = require('express-session')


const sess = {
  secret: 'keyboard cat',
  cookie: {}
}
var myusername = 'user1'
var mypassword = 'pass1'

router.use(session(sess))

/* GET users listing. */
router.get('/:mode', function(req, res, next) {
  console.log('aaaa')
  res.render("session", {mode:req.params.mode});
});

router.get('/', (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    res.redirect('/session/login')
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/session/login')
})

router.get('/login', (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    res.render("session", {mode:"login"});
  }
})

router.post('/login', (req, res, next) => {
  console.log(req.body)
  if (req.body.username == myusername && req.body.password == mypassword) {
    req.session.username = req.body.username
    console.log('login ok')
    res.redirect('/')
  } else {
    console.log('login fail')
    res.redirect('/session/login')
  }
})

router.post('/register', (req, res, next) => {
  console.log(req.body)
  myusername = req.body.username
  mypassword = req.body.password
  console.log('register ok')
  console.log(myusername)
  res.redirect('/session/login')
})

module.exports = router;
