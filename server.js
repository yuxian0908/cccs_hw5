const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.set('view engine', 'ejs');  

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.sequelize.sync();

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


app.get("/", (req, res) => {
  ret = []
  tutors = Tutorial.findAll().then(function(value) {
    value.forEach(element => { 
      ret.push(element);
    });	

    res.render('default', {  
      title: '首頁',  
      tutors: ret 
    });
  });
});


app.post("/post", (req,res)=>{
  console.log(req.body);
  Tutorial
  .create({ title: req.body.title, description: req.body.description, published: 1 })
  .then(function(tutor) {
    console.log(tutor.get({
      plain: true
    }))
  })
  res.redirect('/');
})



// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});``