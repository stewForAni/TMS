 $(document).ready(function() {
     $('#login').click(function() {
         var name = $("#username").val();
         var pwd = $("#password").val();

         $.ajax({
             url: "http://47.88.153.88:8080/app-cms-web/v1/web/login",
             type: "POST",
             cache: false,
             data: { userName: name, passWord: pwd },
             success: function(result) {

                 if (result.status == 1) {

                     // $.cookie('times', result.data.times);
                     // $.cookie('userName', result.data.username);
                     // $.cookie('token', result.data.token, { expires: 7 });


                     var times = result.data.times;
                     var userName = result.data.username;
                     var token = result.data.token;
                     var url = "main.html?p1=" + times + "&p2=" + userName + "&p3=" + token;
                     window.location.replace(url);
                     
                 } else {
                     alert(result.errmsg)
                 }


             }
         });
         return false;
     });

 });