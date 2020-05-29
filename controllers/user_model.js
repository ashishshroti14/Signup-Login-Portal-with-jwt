var bodyParser = require('body-parser')
var message='';
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;


var urlEncodedParser = bodyParser.urlencoded({extended: false});

db.on('error', console.error.bind(console, 'connection error: '));

var userSchema = new mongoose.Schema({
   password: String,
    username: String
        
    
})

var User = mongoose.model('User', userSchema, 'User');

module.exports = mongoose.model('users', userSchema);  