var bodyParser = require('body-parser')
var message='';
var bcrypt= require('bcrypt');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
var User = require('./user_model')

var urlEncodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

    app.get('/signup', (req, res) => {
        // console.log('welcome to the signup portal')
        res.render('signup.ejs',{ msg : 'welcome to the signup portal'});
    })

    app.post('/signup', urlEncodedParser, (req, res) => {
        //Get data from the view and add it to mongodb

        data = req.body
        
        
        
        // console.log(data);
        if (data.password === data.confirmPassword){

            delete data.confirmPassword
            // console.log(data);
           
            bcrypt.hash(data.password, 10, (err, hash) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                } else {
                    const user =  {
                        username: data.username,
                        password : hash 
                    }

                    User.countDocuments({'username': user.username}, (err, result) => {
                        // console.log(result);
                        if(!result){
                            var newUser = User(user).save((err, user) => {
        
                                // console.log(user);
                                message= 'account created'
                                res.json({user,message})
                                 
                
                                // console.log('account created!')
        
                        })
                    }
        
                        else {
                            message = 'username already taken'
                            
                            res.json(message)
                            // console.log(message)
                            // console.log('username already taken')
                        }
                    })
                }
            })
           
           
           
           
           
        
           
        }
        
        else {
            // console.log('Confirm password doesn\'t match with the entered password')
        
        message = 'Confirm password doesn\'t match with the entered password'
        res.json(message)
    
    }
        
        
       // res.render('signup.ejs', {msg: message});
      
    })
}