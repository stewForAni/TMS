 var dialog1;
 var dialog2;

 var laodingDialog = dialog({
     width: 60,
     height: 60
 });

 var msg1 = {
     "data": [{
         "lesson_id": "00000001",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000002",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000003",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000004",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000005",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000006",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000007",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, {
         "lesson_id": "00000008",
         "start_time": "9:30",
         "end_time": "11:30",
         "material": "语文教材",
         "teacher": "韩老师"
     }, ]
 };





 $(document).ready(function() {


     //   $.ajax({
     //           url:"",
     //           type:"POST",
     //           cache: false,
     //           data:{},
     //           success:function(result) {
     //            
     //           }
     //   });
     // return false;

     dealdata1();

 });





 function dealdata1() {

     var content = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
         '当期位置：TMS/<a href="main.html">课程管理</a>/<a href="classmanage.html">班级管理</a>/<a href="#">课次管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_class">添加课次</button>' +
         '</div>' +
         '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
         '<table>' +
         '<thead>' +
         '<tr>' +
         '<th>课次ID</th>' +
         '<th>开始时间</th>' +
         '<th>结束时间</th>' +
         '<th>教材</th>' +
         '<th>老师</th>' +
         '<th>操作1</th>' +
         '<th>操作2</th>' +
         '</tr>' +
         '</thead>' +
         '<tbody id="td_userlist"></tbody></table></div>'

     $('#main_content').append(content);

     for (var i = 0; i < msg1.data.length; i++) {

         var predata = msg1.data[i];
         var newdata = '<tr><td>' +
             predata.lesson_id +
             '</td><td>' +
             predata.start_time +
             '</td><td>' +
             predata.end_time +
             '</td><td>' +
             predata.material +
             '</td><td>' +
             predata.teacher +
             '</td><td><button class="btn waves-effect waves-light blue" id="change' + i + '">修改</button>' +
             '</td><td><button class="btn waves-effect waves-light blue" id="delete' + i + '">删除</button>' +
             '</td></tr>"'

         $('#td_userlist').append(newdata);

         (function(predata) {

             $("#change" + i).click(function() {
                 showChangeDialog1(predata);
                 return false;
             });

         })(predata);

         $("#delete" + i).click(function() {

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
         '<input id="start_time" name="start_time" type="text" class="validate"/>' +
         '<label for="start_time">开始时间</label>' +
         '</div>' +
         '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="end_time" name="end_time" type="text" class="validate"/>' +
         '<label for="end_time">结束时间</label>' +
         '</div>' +
         '</div>' +


         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="material" name="material" type="text" class="validate"/>' +
         '<label for="material">教材</label>' +
         '</div>' +
         '</div>' +


         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="teeacher" name="teeacher" type="text" class="validate"/>' +
         '<label for="teeacher">老师</label>' +
         '</div>' +
         '</div>' +

         '</form>';

     dialog1 = dialog({
         width: 400,
         title: '添加课次',
         content: innerText,
         okValue: '确定',
         ok: function() {},
         cancelValue: '取消',
         cancel: function() {}
     });

     dialog1.showModal();
 }

 function showChangeDialog1(data) {

     var innerText = ' <form>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="start_time" name="start_time" type="text" class="validate"/>' +
         '<label class="active" for="start_time">开始时间</label>' +
         '</div>' +
         '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="end_time" name="end_time" type="text" class="validate"/>' +
         '<label class="active" for="end_time">结束时间</label>' +
         '</div>' +
         '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="material" name="material" type="text" class="validate"/>' +
         '<label class="active" for="material">教材</label>' +
         '</div>' +
         '</div>' +

         '<div class="row">' +
         '<div class="input-field col s12">' +
         '<input id="teacher" name="teacher" type="text" class="validate"/>' +
         '<label class="active" for="teacher">老师</label>' +
         '</div>' +
         '</div>' +

         '</form>';

     dialog1 = dialog({
         width: 400,
         title: '修改课次',
         content: innerText,
         okValue: '确定',
         ok: function() { confirmDialog(data); return false; },
         cancelValue: '取消',
         cancel: function() {}
     });

     dialog1.showModal();

     $('#start_time').val(data.start_time);
     $('#end_time').val(data.end_time);
     $('#material').val(data.material);
     $('#teacher').val(data.teacher);
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