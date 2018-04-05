 var dialog1;
 var dialog2;

 var laodingDialog = dialog({
     width: 60,
     height: 60
 });

 var courseId;
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


     courseId = obj.courseId;
     userName = obj.name;

      refleshClassList();
 });

function refleshClassList(){
     $.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/class/list",
               type:"POST",
               cache: false,
               data:{gradeSubjectId:courseId},
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

 function dealdata1(msg) {
     $('#main_content').empty();
     $('#main_content').append(classListContent);

     for (var i = 0; i < msg.data.list.length; i++) {

         var predata = msg.data.list[i];
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.className +
              '</td><td>' +
             predata.classHours +
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
             });
         })(predata);


         (function(predata) {
        $("#delete" + i).click(function() {
                 deleteClassApi(predata);
         });
         })(predata);


         (function(predata) {
          $("#classcountmanage" + i).click(function() {
             window.location.href = "lessonmanage.html";
             return false;
         });

         })(predata);

     }


     $('#add_class').click(function() {
         showAddClassDialog();
     });


 }

function deleteClassApi(data){


     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/class/delete",
         type: "POST",
         cache: false,
         data:{ id: data.id, loginName: userName },
         success: function(result) {
             refleshClassList();
         }
     });
}

 function showAddClassDialog() {

     dialog1 = dialog({
         width: 400,
         title: '添加班级',
         content: addClassDialogContent,
         okValue: '确定',
         ok: function() {

          var val1 = $("#name").val();
          var val2 = $("#coursehours").val(); 
          var val3 = $("#add_teacher_select").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
             } else {
                 addClassApi(val1, val2, val3);
             }
         },
         cancelValue: '取消',
         cancel: function() {
         }
     });

    var teacherList = teacherData.data.list;
    for (var j = 0; j < teacherList.length; j++) {
         $('#add_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].teacherName + '</option>');
     }
     dialog1.showModal();
     $('select').material_select();

 }

function addClassApi(p1,p2,p3){

$.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/class/add",
               type:"POST",
               cache: false,
               data:{className:p1,gradeSubjectId:courseId,classHours:p2,teacherId:p3},
               success:function(result) {
                     refleshClassList();
               }
       });

}

 function showClassChangeDialog(data) {
     dialog1 = dialog({
         width: 400,
         title: '修改班级',
         content: changeClassDialogContent,
         okValue: '确定',
         ok: function() { 

          var val1 = $("#name").val();
          var val2 = $("#coursehours").val(); 
          var val3 = $("#change_teacher_select").val();
             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
             } else {
                 changeClassApi(val1, val2, val3,data.id);
             }

             },
         cancelValue: '取消',
         cancel: function() {}
     });


    var teacherList = teacherData.data.list;
    for (var j = 0; j < teacherList.length; j++) {
         $('#change_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].teacherName + '</option>');
     }

     dialog1.showModal();

     $('#name').val(data.className);
     $('#coursehours').val(data.classHours);
     $('select').material_select();
 }

function changeClassApi(p1, p2, p3,classId){
$.ajax({
               url:"http://47.88.153.88:8080/app-cms-web/v1/web/class/update",
               type:"POST",
               cache: false,
               data:{id:classId,className:p1,gradeSubjectId:courseId,classHours:p2,teacherId:p3},
               success:function(result) {
                     refleshClassList();
               }
       });


}


 function isEmpty(obj) {
     for (var name in obj) {
         return false;
     }
     return true;
 };