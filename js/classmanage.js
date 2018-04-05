 var dialog1;
 var dialog2;

 var laodingDialog = dialog({
     width: 60,
     height: 60
 });



 $(document).ready(function() {


       $.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/class/list",
               type:"GET",
               cache: false,
               data:{},
               success:function(result) {
                     dealdata1(result);
               }
       });

 });





 function dealdata1(msg) {

     var content = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
         '当期位置：TMS > <a href="main.html">学期管理</a> > <a href="coursemanage.html">课程管理</a> > <a href="#">班级管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_class">添加班级</button>' +
         '</div>' +
         '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
         '<table>' +
         '<thead>' +
         '<tr>' +
         '<th>班级ID</th>' +
         '<th>名称</th>' +
         '<th>课次</th>' +
         '<th>老师</th>' +
         '<th>操作1</th>' +
         '<th>操作2</th>' +
         '<th>操作3</th>' +
         '</tr>' +
         '</thead>' +
         '<tbody id="td_classlist"></tbody></table></div>'

     $('#main_content').append(content);

     for (var i = 0; i < msg.data.list.length; i++) {

         var predata = msg.data.list[i];
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.className +
             '</td><td>' +
             predata.courses +
             '</td><td>' +
             predata.teacherName +
             '</td><td><button class="btn waves-effect waves-light orange" id="classcountmanage' + i + '">课次管理</button>' +
             '</td><td><button class="btn waves-effect waves-light blue" id="change' + i + '">修改</button>' +
             '</td><td><button class="btn waves-effect waves-light blue" id="delete' + i + '">删除</button>' +
             '</td></tr>"'

         $('#td_classlist').append(newdata);

         (function(predata) {

             $("#change" + i).click(function() {
                 showClassChangeDialog(predata);
                 return false;
             });

         })(predata);

         $("#delete" + i).click(function() {

         });


         $("#classcountmanage" + i).click(function() {

             window.location.href = "lessonmanage.html";
             return false;

         });

     }


     $('#add_class').click(function() {
         showadduserdialog();
     });


 }


 function showadduserdialog() {

     var innerText = ' <form>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="username" name="username" type="text" class="validate"/>' +
         '<label for="username">名称</label>' +
         '</div>' +
         '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="password" name="password" type="text" class="validate"/>' +
         '<label for="password">课次</label>' +
         '</div>' +
         '</div>' +


         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="password" name="password" type="text" class="validate"/>' +
         '<label for="password">老师</label>' +
         '</div>' +
         '</div>' +

         '</form>';

     dialog1 = dialog({
         width: 400,
         title: '添加班级',
         content: innerText,
         okValue: '确定',
         ok: function() {},
         cancelValue: '取消',
         cancel: function() {}
     });

     dialog1.showModal();
 }

 function showClassChangeDialog(data) {

     var innerText = ' <form>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="classname" name="classname" type="text" class="validate"/>' +
         '<label class="active" for="classname">名称</label>' +
         '</div>' +
         '</div>' +

         // '<div class="row">' +
         // '<div class="input-field col s12">' +
         // '<input id="lessonCount" name="lessonCount" type="text" class="validate"/>' +
         // '<label class="active" for="lessonCount">课次</label>' +
         // '</div>' +
         // '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="teacher" name="teacher" type="text" class="validate"/>' +
         '<label class="active" for="teacher">老师</label>' +
         '</div>' +
         '</div>' +

         '</form>';

     dialog1 = dialog({
         width: 400,
         title: '修改班级',
         content: innerText,
         okValue: '确定',
         ok: function() { confirmDialog(data); return false; },
         cancelValue: '取消',
         cancel: function() {}
     });

     dialog1.showModal();

     $('#classname').val(data.className);
     //$('#lessonCount').val(data.lesson_count);
     $('#teacher').val(data.teacherName);
 }


 function confirmDialog() {
     dialog2 = dialog({
         content: '确认修改？',
         okValue: '确认',
         ok: function() {
             confirmDeal();
         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog2.showModal();
 }

 function confirmDeal() {
     laodingDialog.showModal();
     dialog1.remove();
     dialog2.remove();

     setTimeout(function() {
         laodingDialog.close();
     }, 2000);

 }