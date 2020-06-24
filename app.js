var express = require('express');
var jwt = require('jsonwebtoken')

var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var app = express();

var signupController = require('./controllers/signupController.js')
var loginController = require('./controllers/loginController.js')
// var loginWelcomeController = require('./controllers/loginWelcomeController.js')



app.set('view engine','ejs');


app.use(express.static('./'));

signupController(app);
loginController(app);
// loginWelcomeController(app);




app.listen (5000, () => {
    console.log('listening to the port 5000')
})