 $(document).ready(function() {
     $('#login').click(function() {
         var name = $("#username").val();
         var pwd = $("#password").val();

         $.ajax({
             url: TMS_BASE_URL+TMS_LOGIN_API,
             type: "POST",
             cache: false,
             data: { userName: name, passWord: pwd },
             success: function(result) {

                 if (result.status == 1) {

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