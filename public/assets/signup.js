$(document).ready(function(){


    
    $('#myForm').on('submit', function(){
     
var info = {
    username: $('#username').val(),
    password: $('#password').val(),
    confirmPassword: $('#confirmPassword').val()
}
        
        
    
        

        

        $.ajax({
            type: 'POST',
            url: '/signup',
            data: info,
            //datatype: 'json',
            success: (data) => {
                //do something with the data via front-end framework 
                // console.log(data);
                // console.log('success')
               // location.reload();
            },
            error: (err) => {
                if (err) throw err
                // console.log('error');

            },
            complete: () => {
                // console.log('complete')
            }
        }).done( (response) =>  {
            // console.log(response,' response')
            switch(response.message){
                case 'account created' :{
                    
                    onAccountCreation(response)
                    break
                }
                default : {
                    onError(response);
                    break
                }
            }
             
        })
        
        return false;
        });
    })

var onAccountCreation = (response) => {
    
    document.getElementById('p01').innerHTML = 'Hi '+ response.user.username
    document.getElementById('p02').innerHTML = 'Congrats, your account has been created. Proceed to login' 
    document.getElementById('myForm').remove()
    //document.getElementById('password').remove()
    //document.getElementById('confirmPassword').remove()

    
}

var onError = (response) => {
    // console.log( response)
    document.getElementById('p01').innerHTML = 'Sorry, ' + response
    document.getElementById('p02').innerHTML = 'Please Try Again' 
    document.getElementById('myForm').remove()
    document.getElementById('a01').remove()

   var link = "<a href = '/signup'> Signup </a>";
   $('body').append(link)
}