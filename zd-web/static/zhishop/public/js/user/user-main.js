$(function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 13) {
            verifyUser();
        }
    }
});

//determine user is already login
function verifyUser() {
    if (!validate()) {
        return;
    }
    var passwordEle = $("#password");
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/user/account/login',
        type: 'post',
        dataType: '',
        data: {
            "account": $("#account").val(),
            "password": passwordEle.val(),
        },
        success: function (data) {
            if (data.result) {
                location.href = "index.html";
            } else {
                passwordEle.val("");
                passwordEle.attr("placeholder", "用户名或密码错误");
            }
        }, error: function () {
            alert("error");
        }

    });
}

