 var dialog1;
 var dialog2;

 var laodingDialog = dialog({
     width: 60,
     height: 60
 });



  var classId;
 var userName;
 var teacherData;


 $(document).ready(function() {

 var url = location.search;
     var obj = {};

     if (url.indexOf("?") != -1) {
         var strs = url.substr(1).split("&");　
         for (var i = 0; i < strs.length; i++) {
             obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
         }
     }


     classId = obj.classId;
     userName = obj.name;

refleshLessonList();
 });

function refleshLessonList(){
$.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/course/list",
               type:"POST",
               cache: false,
               success:function(result) {
                     dealdata1(result);

               }
       });


     getTeacherDataForAddClass();


}

function getTeacherDataForAddClass(){
    $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/teacher/list",
         type: "POST",
         cache: false,
         success: function(result) {
             teacherData = result;
         }
     });
}


 function dealdata1(msg1) {
$('#main_content').empty();
     $('#main_content').append(lessonListContent);

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
             });

         })(predata);



         (function(predata) {

             $("#delete" + i).click(function() {

         });

         })(predata);

        

     }


     $('#add_class').click(function() {
         showAddLessonDialog();
     });


 }


 function showAddLessonDialog() {

     dialog1 = dialog({
         width: 400,
         title: '添加课次',
         content: addLessonDialogContent,
         okValue: '确定',
         ok: function() {

 var val1 = $("#start_time").val();
          var val2 = $("#end_time").val(); 
          var val3 = $("#add_teacher_select").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
             } else {
                 addLessonApi(val1, val2, val3);
             }


         },
         cancelValue: '取消',
         cancel: function() {}
     });

var teacherList = teacherData.data.list;
    for (var j = 0; j < teacherList.length; j++) {
         $('#add_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].teacherName + '</option>');
     }
     dialog1.showModal();
     $('select').material_select(); 
 }


function addLessonApi(val1, val2, val3){

$.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/course/add",
               type:"POST",
               cache: false,
               data:{teacherId:val3,start_time:val1,end_time:val2,classId:classId},
               success:function(result) {
refleshLessonList();
               }
       });


}

 function showChangeDialog1(data) {

     dialog1 = dialog({
         width: 400,
         title: '修改课次',
         content: changeLessonDialogContent,
         okValue: '确定',
         ok: function() { 

          var val1 = $("#start_time").val();
          var val2 = $("#end_time").val(); 
          var val3 = $("#change_teacher_select").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
             } else {
                 chnageLessonApi(val1, val2, val3);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });
     
    var teacherList = teacherData.data.list;
    for (var j = 0; j < teacherList.length; j++) {
         $('#add_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].teacherName + '</option>');
     }
     dialog1.showModal();
     $('select').material_select(); 

     $('#start_time').val(data.start_time);
     $('#end_time').val(data.end_time);
 }


function chnageLessonApi(val1, val2, val3){

$.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/course/upload",
               type:"POST",
               cache: false,
               data:{teacherId:val3,start_time:val1,end_time:val2,classId:classId},
               success:function(result) {
refleshLessonList();
               }
       });



}

 function isEmpty(obj) {
     for (var name in obj) {
         return false;
     }
     return true;
 };












