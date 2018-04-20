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
         url: TMS_BASE_URL + TMS_LESSON_LIST_DATA,
         type: "POST",
         cache: false,
         data: { classId: classId },
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             showlist(result);
         },
         error: function(err) {
             var errorDialog = dialog({
                 width: 300,
                 title: '错误提示：',
                 content: xhr.status + "/" + xhr.statusText,
             });

             errorDialog.showModal();
         }
     });

     getTeacherDataForAddClass();

 }

 function getTeacherDataForAddClass() {
     $.ajax({
         url: TMS_BASE_URL + TMS_TEACHER_LIST_DATA,
         type: "POST",
         cache: false,
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             teacherData = result;
         },
         error: function(err) {
             var errorDialog = dialog({
                 width: 300,
                 title: '错误提示：',
                 content: xhr.status + "/" + xhr.statusText,
             });

             errorDialog.showModal();
         }
     });
 }


 function showlist(msg1) {
     $('#main_content').empty();
     $('#main_content').append(lessonListContent);
     for (var i = 0; i < msg1.data.list.length; i++) {
         var predata = msg1.data.list[i];

         if (isEmpty(predata.startTime)) {
             predata.startTime = "Null";
         }

         if (isEmpty(predata.endTime)) {
             predata.endTime = "Null";
         }


         var time1 = predata.startTime.substring(0, 16);
         var time2 = predata.endTime.substring(0, 16);

         var newdata = '<tr><td>' +
             (i + 1) +
             '</td><td>' +
             predata.courseName +
             '</td><td>' +
             time1 +
             '</td><td>' +
             time2 +
             '</td><td><a href="http://47.88.153.88:8080/app-cms-web/v1/web/course/downLoad?id=' + predata.courseId + '" target="_blank">' + predata.fileName + '</a></td><td>' +
             predata.teacherName +
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
                 deleteLessonApi(predata);
             });

         })(predata);
     }


     $('#add_class').click(function() {
         showAddLessonDialog();
     });


 }


 function deleteLessonApi(data) {
     $.ajax({
         url: TMS_BASE_URL + TMS_LESSON_DELETE_DATA,
         type: "POST",
         cache: false,
         data: { id: data.courseId },
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             refleshLessonList();
         },
         error: function(err) {
             var errorDialog = dialog({
                 width: 300,
                 title: '错误提示：',
                 content: xhr.status + "/" + xhr.statusText,
             });

             errorDialog.showModal();
         }
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
             var val4 = $("#courseName").val();
             var val3 = $("#add_teacher_select").val();

             if (isEmpty(file) || isEmpty(name) || (name != "pdf")) {

                 alert("文件错误,必须是PDF文件！");
                 return false;

             } else {

                 if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4)) {
                     alert("信息输入有误！");
                     return false;
                 } else {   


                     if (val1.length < 19) {
                         val1 = val1 + ":00";
                     }

                     if (val2.length < 19) {
                         val2 = val2 + ":00";
                     }


                     var formData = new FormData();
                     formData.append('teacherId', val3);
                     formData.append('startTime', val1);
                     formData.append('endTime', val2);
                     formData.append('courseName', val4);
                     formData.append('classId', classId);
                     formData.append('file', file);
                     addLessonApi(formData);
                 }

             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     var teacherList = teacherData.data.list;

     for (var j = 0; j < teacherList.length; j++) {
         $('#add_teacher_select').append('<option value="' + teacherList[j].teacherId + '">' + teacherList[j].teacherId + "." + teacherList[j].teacherName + '</option>');
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
         url: TMS_BASE_URL + TMS_LESSON_ADD_DATA,
         type: "POST",
         cache: false,
         data: formdata,

         xhr: function() { // custom xhr
             myXhr = $.ajaxSettings.xhr();
             if (myXhr.upload) { // check if upload property exists
                 myXhr.upload.addEventListener('progress', function(e) {
                     if (e.lengthComputable) {
                         $('progress').attr({
                             value: e.loaded,
                             max: e.total,
                         });

                     }
                 }, false); // for handling the progress of the upload
             }
             return myXhr;
         },

         processData: false,
         contentType: false,
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             progressDialog.remove();
             refleshLessonList();
         },
         error: function(err) {
             progressDialog.remove();


             var errorDialog = dialog({
                 width: 300,
                 title: '警告！',
                 content: '添加失败！',
             });

             errorDialog.showModal();


         }
     });


 }



 function showChangeDialog1(data) {

     var file;
     var name;

     dialog1 = dialog({
         width: 400,
         title: '修改课次',
         content: changeLessonDialogContent,
         okValue: '确定',

         ok: function() {

             var val1 = $("#start_time").val();
             var val2 = $("#end_time").val();
             var val4 = $("#courseName").val();

             var val3 = $("#change_teacher_select").val();


             if (!isEmpty(file) && (name != "pdf")) {
                 alert("文件错误,必须是PDF文件！");
                 return false;
             }


             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4)) {
                 alert("信息输入有误！");
                 return false;
             } else {   


                 if (val1.length < 19) {
                     val1 = val1 + ":00";
                 }

                 if (val2.length < 19) {
                     val2 = val2 + ":00";
                 }

                 var formData = new FormData();
                 if (isEmpty(file)) {
                     formData.append('teacherId', val3);
                     formData.append('startTime', val1);
                     formData.append('endTime', val2);
                     formData.append('classId', classId);
                     formData.append('courseName', val4);
                     formData.append('id', data.courseId);
                     changeLessonApiwithoutFile(formData);
                 } else {
                     formData.append('teacherId', val3);
                     formData.append('startTime', val1);
                     formData.append('endTime', val2);
                     formData.append('classId', classId);
                     formData.append('courseName', val4);
                     formData.append('file', file);
                     formData.append('id', data.courseId);
                     changeLessonApi(formData);
                 }



             }

         },

         cancelValue: '取消',
         cancel: function() {}
     });

     var teacherList = teacherData.data.list;

     for (var j = 0; j < teacherList.length; j++) {
         $('#change_teacher_select').append('<option value="' + teacherList[j].teacherId + '">' + teacherList[j].teacherId + "." + teacherList[j].teacherName + '</option>');
     }

     dialog1.showModal();
     $('select').material_select();

     $('#start_time').val(data.startTime);
     $('#end_time').val(data.endTime);
     $('#courseName').val(data.courseName);
     $('#start_picker').DateTimePicker();
     $('#end_picker').DateTimePicker();


     $('#change_file').change(function() {
         file = this.files[0];
         name = file.name.substring(file.name.length - 3, file.name.length);
     });

 }

 function changeLessonApiwithoutFile(data) {


     $.ajax({
         url: TMS_BASE_URL + TMS_LESSON_MODIFY_DATA,
         type: "POST",
         cache: false,
         data: data,
         processData: false,
         contentType: false,
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             refleshLessonList();
         },
         error: function(err) {
             var errorDialog = dialog({
                 width: 300,
                 title: '警告！',
                 content: '修改失败！',
             });

             errorDialog.showModal();
         }
     });

 }

 function changeLessonApi(data) {

     var progressDialog = dialog({
         width: 300,
         title: '上传课件中，请稍等...',
         content: progressContent,
     });

     progressDialog.showModal();

     $.ajax({
         url: TMS_BASE_URL + TMS_LESSON_MODIFY_DATA,
         type: "POST",
         cache: false,
         data: data,

         xhr: function() { // custom xhr
             myXhr = $.ajaxSettings.xhr();
             if (myXhr.upload) { // check if upload property exists
                 myXhr.upload.addEventListener('progress', function(e) {
                     if (e.lengthComputable) {
                         $('progress').attr({
                             value: e.loaded,
                             max: e.total,
                         });

                     }
                 }, false); // for handling the progress of the upload
             }
             return myXhr;
         },

         processData: false,
         contentType: false,
         success: function(result) {
             if(result.status == 99){
               window.location.replace("index.html");
            };
             progressDialog.remove();
             refleshLessonList();
         },
         error: function(err) {
             progressDialog.remove();
             var errorDialog = dialog({
                 width: 300,
                 title: '警告！',
                 content: '修改失败！',
             });

             errorDialog.showModal();
         }
     });

 }

 function isEmpty(obj) {
     for (var name in obj) {
         return false;
     }
     return true;
 };