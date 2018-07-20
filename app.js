var express                 = require("express");
    app                     = express();
    bodyParser              = require('body-parser');
    mongoose                = require('mongoose');
    passport                = require('passport');
    User                    = require('./models/user')
    LocalStrategy           = require('passport-local');
    passportLocalMongoose   = require('passport-local-mongoose');



mongoose.connect("mongodb://localhost/pass_auth_demo");

app.use(require("express-session")({
  secret: "Top secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// for encoding and decoding sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine","ejs");


// ++++++++++++++++++++++++
// ROUTES
// ++++++++++++++++++++++++


app.get('/', (req,res)=>{
  res.render('home');
});

app.get('/secret', (req,res)=>{
  res.render('secret');
});


// Auth ROUTES
// show sign up form
app.get('/register',(req,res)=> {
  res.render('register');
});

// handling user sign up
app.post('/register', (req,res)=>{
  User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      // can change "local" to "twitter" or "google" to use different strategies
      // log the user in
      passport.authenticate("local")(req,res,()=>{
        res.redirect('/secret');
      });
    }
  });
});

// Show login form
app.get('/login',(req,res)=> {
  res.render('login');
});









app.listen(3000, (req,res) =>{
  console.log("3000 is the magic port");
});
