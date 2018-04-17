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

 function refleshClassList() {
     $.ajax({
         url: TMS_BASE_URL + TMS_CLASS_LIST_DATA,
         type: "POST",
         cache: false,
         data: { gradeSubjectId: courseId },
         success: function(result) {
             dealdata1(result);
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
             teacherData = result;
         }
     });
 }

 function dealdata1(msg) {

     $('#main_content').empty();

     $('#main_content').append(classListContent);

     for (var i = 0; i < msg.data.list.length; i++) {

         var predata = msg.data.list[i];
         var time1 = predata.startTime.substring(11, 17);
         var time2 = predata.endTime.substring(11, 17);
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.className + "(" + time1 + "--" + time2 + ")" +
             '</td><td>' +
             predata.classHours +
             '</td><td>' +
             predata.teacherName +
             '</td><td>' +
             time1 +
             '</td><td>' +
             time2 +
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

                 var url = "lessonmanage.html?classId=" + predata.id + "&name=" + userName;
                 window.location.href = url;
             });

         })(predata);

     }


     $('#add_class').click(function() {
         showAddClassDialog();
     });


 }

 function deleteClassApi(data) {

     $.ajax({
         url: TMS_BASE_URL + TMS_CLASS_DELETE_DATA,
         type: "POST",
         cache: false,
         data: { id: data.id, loginName: userName },
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
             var val4 = $("#start_time").val() + ":00";
             var val5 = $("#end_time").val() + ":00";
             var val6 = $("#add_interval_time").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4) || isEmpty(val5) || isEmpty(val6)) {
                 alert("输入有误！");
                 return false;
             } else {
                 addClassApi(val1, val2, val3, val4, val5, val6);
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
 }

 function addClassApi(p1, p2, p3, p4, p5, p6) {

     $.ajax({
         url: TMS_BASE_URL + TMS_CLASS_ADD_DATA,
         type: "POST",
         cache: false,
         data: {
             className: p1,
             gradeSubjectId: courseId,
             classHours: p2,
             teacherId: p3,
             startTime: p4,
             endTime: p5,
             intervalDays: p6
         },
         success: function(result) {
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
             var val4 = $("#start_time").val();
             var val5 = $("#end_time").val();
             var val6 = $("#change_interval_time").val();


             if (val4.length < 19) {
                 val4 = val4 + ":00";
             }

             if (val5.length < 19) {
                 val5 = val5 + ":00";
             }

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4) || isEmpty(val5) || isEmpty(val6)) {
                 alert("输入有误！");
                 return false;
             } else {
                 changeClassApi(val1, val2, val3, data.id, val4, val5, val6);
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

     $('#name').val(data.className);
     $('#coursehours').val(data.classHours);
     $('select').material_select();

     $('#start_time').val(data.startTime);
     $('#end_time').val(data.endTime);



     $('#start_picker').DateTimePicker();
     $('#end_picker').DateTimePicker();


 }

 function changeClassApi(p1, p2, p3, classId, p4, p5, p6) {
     $.ajax({
         url: TMS_BASE_URL + TMS_CLASS_MODIFY_DATA,
         type: "POST",
         cache: false,
         data: {
             id: classId,
             className: p1,
             gradeSubjectId: courseId,
             classHours: p2,
             teacherId: p3,
             startTime: p4,
             endTime: p5,
             intervalDays: p6
         },
         success: function(result) {
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