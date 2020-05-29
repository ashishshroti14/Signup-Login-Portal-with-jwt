var bodyParser = require('body-parser')
var fs= require('fs')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

var urlEncodedParser = bodyParser.urlencoded({extended: false});

var User = require('./user_model') 
module.exports = function(app){

    app.get('/login', urlEncodedParser,(req, res) => {
        if(req.headers['authorization'] === undefined){
        // console.log('welcome to the login portal')
        res.render('login.ejs',{ msg : 'welcome to the login portal'});}

        else{
            // console.log(req)

            // console.log(req.query, 'user');
           user = req.query
    // console.log(req.headers['authorization'], 'authorization')
    bearerHeader = req.headers['authorization'];
    
    
    bearer = bearerHeader.split(' ')
    // console.log(bearer,'bearer')
    token = bearer[1]
    // console.log(token);

   jwt.verify(token, 'secretkey' , (err, authData)  => {
       if (err) {
           res.send(err);
            // console.log(err);
        } else {
        //   console.log('Welcome')
          message = "Auth Successful"
           
           return res.json({authData, message, token, user})
        }


})
     //res.render('loginWelcome.ejs',{});

   
        }

    })

    app.post('/login',urlEncodedParser, (req,res) => {

       // console.log(req.body)
        data = req.body
        //console.log(data, 'data1')
        

       

        User.findOne( {'username' : req.body.username },(err,result) => {
            // console.log(result, 'data2');
            if(result !== null){
                // console.log(result)
                //res.json(result)
                bcrypt.compare(data.password, result.password, (err, resu) => {
                    if(err) {
                        
                        return result.json({
                            error: err
                        })
                    }
                    if(resu) {
                        // console.log(resu);
                        // console.log(result);

                        user = {
                            username: data.username

                        }
                       
                        // console.log('auth successful')
                        message = "Auth Successful"
                        const token = jwt.sign({
                            username: result.username
                        }, 'secretkey', {expiresIn : '1h'})

                        // console.log(token)
                        
                        
                        return res.json({token, message, user});
                        //res.render('loginWelcome.ejs')
                        
                    }
                    res.json({
                        message: 'Wrong username or password'
                    });
        
                })
            }else{
                message = "Account not Found"
            res.json({result , message})
            // console.log('account not found')
        }

       
        })

       

    })

    

}