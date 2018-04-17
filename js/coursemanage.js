 var dialog1;
 var dialog2;

 var laodingDialog = dialog({
     width: 60,
     height: 60
 });

 var termId;
 var userName;
 var gradeData;
 var subjectData;

 $(document).ready(function() {

     var url = location.search;
     var obj = {};

     if (url.indexOf("?") != -1) {
         var strs = url.substr(1).split("&");　
         for (var i = 0; i < strs.length; i++) {
             obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
         }
     }

     termId = obj.termId;
     userName = obj.name;

     refleshCourseList();
 });

 function refleshCourseList() {
     $.ajax({
         url: TMS_BASE_URL + TMS_COURSE_LIST_DATA,
         type: "POST",
         cache: false,
         data: { termId: termId },
         success: function(result) {
             dealdata(result);
         }
     });

     getGradeDataForTeacherList();
     getSubjectDataForTeacherList();
 }

 function getGradeDataForTeacherList() {
     $.ajax({
         url: TMS_BASE_URL + TMS_GRADE_DATA,
         type: "POST",
         cache: false,
         success: function(result) {
             gradeData = result;
         }
     });
 }

 function getSubjectDataForTeacherList() {
     $.ajax({
         url: TMS_BASE_URL + TMS_SUBJECT_DATA,
         type: "POST",
         cache: false,
         success: function(result) {
             subjectData = result;
         }
     });
 }

 //课程管理逻辑

 function dealdata(msg) {
     $('#main_content').empty();
     $('#main_content').append(courseManageList);
     for (var i = 0; i < msg.data.list.length; i++) {

         var predata = msg.data.list[i];
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.gradeName +
             '</td><td>' +
             predata.subjectName +
             '</td>' +
             '<td><button class="btn waves-effect waves-light orange" id="classmanage' + i + '">班级管理</button></td>' +
             '<td><button class="btn waves-effect waves-light blue" id="change' + i + '">修改</button></td>' +
             '<td><button class="btn waves-effect waves-light blue" id="delete' + i + '">删除</button></td>' +
             '</tr>"';

         $('#td_courselist').append(newdata);

         (function(predata) {

             $("#change" + i).click(function() {
                 showCourseChangeDialog(predata);
             });

         })(predata);

         (function(predata) {

             $("#delete" + i).click(function() {
                 deleteCourseApi(predata);
             });

         })(predata);

         (function(predata) {

             $("#classmanage" + i).click(function() {
                 var url = "classmanage.html?courseId=" + predata.id + "&name=" + userName;
                 window.location.href = url;
             });

         })(predata);
     }

     $('#add_user').click(function() {
         showAddCourseDialog();
     });

 }


 function deleteCourseApi(data) {
     $.ajax({
         url: TMS_BASE_URL + TMS_COURSE_DELETE_DATA,
         type: "POST",
         cache: false,
         data: { id: data.id, loginName: userName },
         success: function(result) {
             refleshCourseList();
         }
     });
 }


 //修改课程
 function showCourseChangeDialog(data) {

     dialog1 = dialog({
         width: 400,
         title: '修改课程',
         content: courseChangeDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#change_subject_select").val();
             var val2 = $("#change_grade_select").val();
             var val3 = $("#change_subject_select").text() + $("#change_grade_select").text();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
                 return false;
             } else {
                 changeCourseApi(data.id, val1, val2, termId, val3);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     var subjectlist = subjectData.data.list;
     var gradelist = gradeData.data.list;

     for (var i = 0; i < subjectlist.length; i++) {
         $('#change_subject_select').append('<option value="' + subjectlist[i].id + '">' + subjectlist[i].subjectName + '</option>');
     }

     for (var j = 0; j < gradelist.length; j++) {
         $('#change_grade_select').append('<option value="' + gradelist[j].id + '">' + gradelist[j].gradeName + '</option>');
     }

     dialog1.showModal();
     $('select').material_select();

 }

 function changeCourseApi(id, val1, val2, termId, val3) {
     $.ajax({
         url: TMS_BASE_URL + TMS_COURSE_MODIFY_DATA,
         type: "POST",
         cache: false,
         data: { id: id, subjectId: val1, gradeId: val2, termId: termId, name: val3 },
         success: function(result) {
             refleshCourseList();
         }
     });
 }

 //添加课程
 function showAddCourseDialog() {

     dialog1 = dialog({
         width: 400,
         title: '添加课程',
         content: courseAddDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#add_subject_select").val();
             var val2 = $("#add_grade_select").val();
             var val3 = $("#add_subject_select").text() + $("#add_grade_select").text();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3)) {
                 alert("输入有误！");
                 return false;
             } else {
                 addCourseApi(val1, val2, termId, val3);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     var subjectlist = subjectData.data.list;
     var gradelist = gradeData.data.list;

     for (var i = 0; i < subjectlist.length; i++) {
         $('#add_subject_select').append('<option value="' + subjectlist[i].id + '">' + subjectlist[i].subjectName + '</option>');
     }

     for (var j = 0; j < gradelist.length; j++) {
         $('#add_grade_select').append('<option value="' + gradelist[j].id + '">' + gradelist[j].gradeName + '</option>');
     }

     dialog1.showModal();
     $('select').material_select();
 }

 function addCourseApi(val1, val2, termId, val3) {

     $.ajax({
         url: TMS_BASE_URL + TMS_COURSE_ADD_DATA,
         type: "POST",
         cache: false,
         data: {
             subjectId: val1,
             gradeId: val2,
             termId: termId,
             name: val3
         },
         success: function(result) {
             refleshCourseList();
         }
     });
 }



 function isEmpty(obj) {
     for (var name in obj) {
         return false;
     }
     return true;
 };