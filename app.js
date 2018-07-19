var express    = require("express");
    app        = express();
    bodyParser = require('body-parser');
    mongoose   = require('mongoose');

mongoose.connect("mongodb://localhost/pass_auth_demo");

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine","ejs");

app.get('/', (req,res)=>{
  res.render('home');
});

app.get('/secret', (req,res)=>{
  res.render('secret');
});


app.listen(3000, (req,res) =>{
  console.log("3000 is the magic port");
});
