//determine user is already login
function checkUser(){
    $.ajax({
        url:'http://api.zhishop.com:94/checkUser',
        type:'post',
        dataType:'json',
        data:{},
        success:function(data){
            if(data.state == "1"){
                window.location.href="login.html";
            }
        },error:function(){
        }

    });
}
// user login
function login() {
    $.ajax({
        url:'http://api.zhishop.com:94/verifyUser',
        type:'post',
        dataType:'json',
        data:{
            "userName":$("#userName").val(),
            "password":$("#password").val(),
        },
        success:function(data){
            if(data.state == "0"){
                window.location.href="index.html";
            }
        },error:function(){
        }

    });
}