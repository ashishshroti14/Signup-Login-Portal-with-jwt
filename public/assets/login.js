$(document).ready(function(){


    
  
     $('#myForm').on('submit', function(){
            var info = {
                username: $('#username').val(),
                password: $('#password').val()
                
            }

            $.ajax({
                type: 'POST',
                url: '/login',
                data: info,
                datatype: 'json',
                success: (data) => {
                    //do something with the data via front-end framework 
                    //console.log(data,'data');
                    //var token = JSON.parse(fs.readFileSync('./token', 'utf-8'))
                   //console.log (token)
                   //console.log('yeah')
                    //window.value = token;
                   // console.log(token,'token');
                //    console.log(data ,'success');
                    
                },
                complete: () => {
                    // console.log ('complete')
                },
                error: () => {
                    // console.log('error')
                }
            }).done((response) => {

                if( response.message === "Auth Successful"){
                    var token= response.token
                    var user =  response.user
                    

                    // console.log('user')
                
                    // console.log(token,response.message,"response.message", response.user, 'response.user');
                
                    $.ajax({
                
                        beforeSend: function(request) {
                          request.setRequestHeader( 'Authorization', 'Bearer '+ token)
                
                        },
                       
                        url: '/login',
                        data : user,
                        dataType: 'json',
                        type: 'GET',
                        success: (data) => {
                            // console.log(data, "cool")
                           //location.replace('/loginWelcome');
                        },
                        complete: () => {
                            // console.log('complete')
                        },
                        error: (err) => {
                            if(err) throw err
                            // console.log(err,'error')
                        }
                      }).done(function(response) {
                          

                        // do something with the response, e.g. isolate the id of a linked resource
                        switch(response.message){

                            case "Auth Successful" : {
                                onAuthentication(response.user)
                                break
                            }
                            default : {
                                onError(response)
                                break
                            }
                        }
                        //location.replace('./loginWelcome')
                      })
                }

                else {
                    onError(response)
                }

                   
                
            })
        //console.log('yeah')
        //console.log (token)
        return false;
        });
        
        
        
        
    })

    var onAuthentication = (response) => {
        // console.log('authenticated')
        document.getElementById('p01').innerHTML= 'Hi ' + response.username;
        document.getElementById('div01').remove()
        var greeting = "<p>Nice to see you</p>"
        $('body').append(greeting)
        document.getElementById('myForm').remove()
        // console.log('yeah')  
        
        // console.log(response);

    }

    var onError = (response) => {
        // console.log( response)
        document.getElementById('p01').innerHTML = 'Sorry, ' + response.message
        var para = '<p> Please Try Again</p>'
        $('body').append(para);
        document.getElementById('myForm').remove()
        document.getElementById('a01').remove()
    
       var link = "<a href = '/login'> Login </a>";
       $('body').append(link)



    }