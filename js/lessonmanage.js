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

 function refleshLessonList() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/course/list",
         type: "POST",
         cache: false,
         success: function(result) {
             dealdata1(result);
         }
     });


     getTeacherDataForAddClass();


 }

 function getTeacherDataForAddClass() {
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

     var file;
     var name;

     dialog1 = dialog({
         width: 400,
         title: '添加课次',
         content: addLessonDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#start_time").val();
             var val2 = $("#end_time").val();
             var val3 = $("#add_teacher_select").val();

             if (isEmpty(file) || isEmpty(name) || (name != "pdf")) {

                 alert("文件错误,必须是PDF文件！");

             } else {

                 if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                     alert("信息输入有误！");
                 } else {   
                     var formData = new FormData();
                     formData.append('teacherId', val3);
                     formData.append('start_time', val1);
                     formData.append('end_time', val2);
                     formData.append('classId', classId);
                     formData.append('file',file);
                     addLessonApi(formData);
                 }

             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     var teacherList = teacherData.data.list;

     for (var j = 0; j < teacherList.length; j++) {
         $('#add_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].id + "." + teacherList[j].teacherName + '</option>');
     }

     dialog1.showModal();
     $('select').material_select();

     $('#start_picker').DateTimePicker();
     $('#end_picker').DateTimePicker();

     $('#add_file').change(function() {
         file = this.files[0];
         name = file.name.substring(file.name.length - 3, file.name.length);
     });

 }


 function addLessonApi(formdata) {


     var progressDialog = dialog({
         width: 300,
         title: '上传课件中，请稍等...',
         content: progressContent,
     });

     progressDialog.showModal();


     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/course/add",
         type: "POST",
         cache: false,
         data: formdata,

         xhr: function() { // custom xhr
             myXhr = $.ajaxSettings.xhr();
             if (myXhr.upload) { // check if upload property exists
                 myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // for handling the progress of the upload
             }
             return myXhr;
         },
         processData: false,
         contentType: false,
         success: function(result) {
             refleshLessonList();
         }
     });


 }


 function progressHandlingFunction(e) {
     if (e.lengthComputable) {
         $('progress').attr({ value: e.loaded, max: e.total });
     }
 }




 function showChangeDialog1(data) {

     dialog1 = dialog({
         width: 400,
         title: '修改课次',
         content: changeLessonDialogContent,
         okValue: '确定',

         ok: function() {

             var val1 = $("#test2").val();
             var val2 = $("#test2-1").val();
             var val3 = $("#change_teacher_select").val();
             var val4 = $("#start_time").val();
             var val5 = $("#end_time").val();
             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4) || isEmpty(val5)) {
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
         $('#add_teacher_select').append('<option value="' + teacherList[j].id + '">' + teacherList[j].id + "." + teacherList[j].teacherName + '</option>');
     }

     dialog1.showModal();
     $('select').material_select();

     $('#start_time').val(data.start_time);
     $('#end_time').val(data.end_time);

     $('#start_picker').DateTimePicker();
     $('#end_picker').DateTimePicker();

 }


 function chnageLessonApi(val1, val2, val3, val4, val5) {

     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/course/upload",
         type: "POST",
         cache: false,
         data: { teacherId: val3, start_time: val1, end_time: val2, classId: classId },
         success: function(result) {
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