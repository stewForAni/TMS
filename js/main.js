 var dialog1;
 var dialog2;
 var gradeData;
 var subjectData;
 var laodingDialog = dialog({
     width: 60,
     height: 60
 });


 //登陆接口返回的三个数据
 var times;
 var userName;
 var token;

 /**
 currentIndex

 0--用户管理
 1--课程管理
 2--年级管理
 3--科目管理
 **/

 var currentIndex = 0;

 $(document).ready(function() {

     $('#user_m').click(function() {
         if (currentIndex == 0) { return; }
         refleshTeacherList();
     });

     $('#term_m').click(function() {
         if (currentIndex == 1) { return; }
         refleshTermList();
     });

     $('#grade_m').click(function() {
         if (currentIndex == 2) { return; }
         refleshGradeList();
     });

     $('#subject_m').click(function() {
         if (currentIndex == 3) { return; }
         refleshSubjectList();
     });

     refleshTeacherList()

 });


 function refleshTeacherList() {
     currentIndex = 0;
     $('#main_content').empty();
     getTeacherList();
     getSubjectDataForTeacherList();
     getGradeDataForTeacherList();
 }

 function refleshTermList() {
     currentIndex = 1;
     $('#main_content').empty();
     getTermData();
 }

 function refleshGradeList() {
     currentIndex = 2;
     $('#main_content').empty();
     getGradeData();
 }

 function refleshSubjectList() {
     currentIndex = 3;
     $('#main_content').empty();
     getSubjectData();
 }




 /////////////////////////////////////////////////
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                 我是分割线                   //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //////////////////////////////////////////////////

 //获取首页年级信息列表数据
 function getGradeDataForTeacherList() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/grade/list",
         type: "POST",
         cache: false,
         success: function(result) {
             gradeData = result;
         }
     });
 }

 //获取首页科目信息列表数据
 function getSubjectDataForTeacherList() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/suject/list",
         type: "POST",
         cache: false,
         success: function(result) {
             subjectData = result;
         }
     });
 }

 //获取首页教师信息列表数据
 function getTeacherList() {

     var url = location.search;
     var obj = {};
     if (url.indexOf("?") != -1) {
         var strs = url.substr(1).split("&");　
         for (var i = 0; i < strs.length; i++) {
             obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
         }
     }

     times = obj.p1;
     userName = obj.p2;
     token = obj.p3;

     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/teacher/list",
         type: "POST",
         cache: false,
         success: function(result) {
             dealTeacherListData(result);
         }
     });
 }


 function dealTeacherListData(msg1) {

     $('#main_content').append(teacherListContent);

     for (var i = 0; i < msg1.data.list.length; i++) {

         var predata = msg1.data.list[i];
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.grades +
             '</td><td>' +
             predata.teacherName +
             '</td><td>' +
             predata.subjectId +
             '</td><td>' +
             predata.teacherId +
             '</td><td>' +
             predata.password +
             '</td><td><button class="btn waves-effect waves-light blue" id="change' +
             i +
             '">修改</button></td><td><button class="btn waves-effect waves-light blue" id="delete' +
             i +
             '">删除</button></td></tr>"'

         $('#td_userlist').append(newdata);

         (function(predata) {
             $("#change" + i).click(function() {
                 showTeacherChangeDialog(predata);
                 return false;
             });
         })(predata);

         (function(predata) {
             $("#delete" + i).click(function() {
                 deleteTeacher(predata.id);
             });
         })(predata);
     }

     $('#add_user').click(function() {
         showAddTeacherDialog();
     });
 }

 function deleteTeacher(deleteId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/teacher/delete",
         type: "POST",
         cache: false,
         data: { id: deleteId, loginName: userName },
         success: function(result) {
             refleshTeacherList();
         }
     });
 }

 function showAddTeacherDialog() {
     dialog1 = dialog({
         width: 350,
         title: '添加用户',
         content: addTeacherDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#add_subject_select").val();
             var val2 = $("#add_grade_select").val();
             var val3 = $("#username").val();
             var val4 = $("#password").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4)) {
                 alert("输入有误！");
             } else {
                 addTeacherApi(val1, val2, val3, val4);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     var subjectlist = subjectData.data.list;
     var gradelist = gradeData.data.list;
     for (var i = 0; i < subjectlist.length; i++) {
         $('#add_subject_select').append('<option value="' + i + '">' + subjectlist[i].subjectName + '</option>');
     }
     for (var j = 0; j < gradelist.length; j++) {
         $('#add_grade_select').append('<option value="' + j + '">' + gradelist[j].gradeName + '</option>');
     }
     dialog1.showModal();
     $('select').material_select();
 }


 function addTeacherApi(p1, p2, p3, p4) {
     var g = "";
     for (var i = 0; i < p2.length; i++) {
         if (i == p2.length - 1) {
             g = g + p2[i];
         } else {
             g = g + p2[i] + ",";
         }
     }

     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/teacher/add",
         type: "POST",
         cache: false,
         data: { teacherName: p3, password: p4, subjectId: p1, grades: g },
         success: function(result) {

             refleshTeacherList();

         }
     });
 }

 function showTeacherChangeDialog(data) {

     dialog1 = dialog({
         width: 400,
         title: '修改用户',
         content: changeTeacherDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#change_subject_select").val();
             var val2 = $("#change_grade_select").val();
             var val3 = $("#username").val();
             var val4 = $("#password").val();

             if (isEmpty(val1) || isEmpty(val2) || isEmpty(val3) || isEmpty(val4)) {
                 alert("输入有误！");
             } else {
                 changeTeacherApi(val1, val2, val3, val4);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });


     var subjectlist = subjectData.data.list;
     var gradelist = gradeData.data.list;

     for (var i = 0; i < subjectlist.length; i++) {
         $('#change_subject_select').append('<option value="' + i + '">' + subjectlist[i].subjectName + '</option>');
     }
     for (var j = 0; j < gradelist.length; j++) {
         $('#change_grade_select').append('<option value="' + j + '">' + gradelist[i].gradeName + '</option>');
     }

     dialog1.showModal();

     $('#username').val(data.teacherName);
     $('#password').val(data.password);
     $('select').material_select();
 }


 function changeTeacherApi(p1, p2, p3, p4) {
     var g = "";
     for (var i = 0; i < p2.length; i++) {
         if (i == p2.length - 1) {
             g = g + p2[i];
         } else {
             g = g + p2[i] + ",";
         }
     }

     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/teacher/update",
         type: "POST",
         cache: false,
         data: { teacherName: p3, password: p4, subjectId: p1, grades: g },
         success: function(result) {
             refleshTeacherList();
         }
     });
 }



 /////////////////////////////////////////////////
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //              我是分割线/学期管理             //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //////////////////////////////////////////////////

 //获取首页学期管理列表数据以及逻辑处理
 function getTermData() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/term/list",
         type: "POST",
         cache: false,
         success: function(result) {
             dealTermListData(result);
         }
     });
 }

 function dealTermListData(p) {
     $('#main_content').append(termListContent);
     for (var i = 0; i < p.data.list.length; i++) {

         var predata = p.data.list[i];
         var newdata = '<tr><td>' +
             predata.id +
             '</td><td>' +
             predata.termName +
             '</td>' +
             '<td><button class="btn waves-effect waves-light orange" id="coursemanage' + i + '">课程管理</button></td>' +
             '<td><button class="btn waves-effect waves-light blue" id="change' + i + '">修改</button></td>' +
             '<td><button class="btn waves-effect waves-light blue" id="delete' + i + '">删除</button></td>' +
             '</tr>"';

         $('#td_termlist').append(newdata);

         (function(predata) {
             $("#change" + i).click(function() {
                 showTermChangeDialog(predata);
             });
         })(predata);

         (function(predata) {
             $("#delete" + i).click(function() {
                 deleteTermApi(predata);
             });
         })(predata);

         (function(predata) {
             $("#coursemanage" + i).click(function() {
                 var times = predata.id;
                 var url = "coursemanage.html?termId=" + predata.id + "&name=" + userName;
                 window.location.href = url;
             });
         })(predata);

     }

     $('#add_user').click(function() {
         showAddTermDialog();
     });
 }

 function deleteTermApi(p) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/term/delete",
         type: "POST",
         cache: false,
         data: { id: p.id, loginName: userName },
         success: function(result) {
             refleshTermList();
         }
     });
 }

 function showTermChangeDialog(data) {
     dialog1 = dialog({
         width: 400,
         title: '修改学期',
         content: termChangeDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#termname").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 changeTermApi(val1, data.id);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });

     dialog1.showModal();
     $('#termname').val(data.termName);
 }

 function changeTermApi(p, termId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/term/update",
         type: "POST",
         cache: false,
         data: { id: termId, termName: p },
         success: function(result) {
             refleshTermList();
         }
     });
 }

 function showAddTermDialog() {
     dialog1 = dialog({
         width: 400,
         title: '添加学期',
         content: termAddDialogContent,
         okValue: '确定',
         ok: function() {
             var val1 = $("#termname").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 addTermApi(val1);
             }
         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog1.showModal();
 }

 function addTermApi(p) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/term/add",
         type: "POST",
         cache: false,
         data: { termName: p },
         success: function(result) {
             refleshTermList();
         }
     });
 }

 /////////////////////////////////////////////////
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //             我是分割线/年级管理              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //////////////////////////////////////////////////


 function getGradeData() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/grade/list",
         type: "POST",
         cache: false,
         success: function(result) {
             dealGradeData(result);
         }
     });
 }


 //年级  逻辑处理
 function dealGradeData(p) {
     $('#main_content').append(gradeListContent);
     for (var i = 0; i < p.data.list.length; i++) {
         var predata = p.data.list[i];
         var newdata = '<tr><td style="text-align:center"">' +
             predata.gradeName +
             '</td><td><button class="btn waves-effect waves-light blue" id="change' +
             i +
             '">修改</button></td><td><button class="btn waves-effect waves-light blue" id="delete' +
             i +
             '">删除</button></td></tr>"';

         $('#td_gradelist').append(newdata);

         (function(predata) {
             $("#change" + i).click(function() {
                 showGradeChangeDialog(predata);
             });
         })(predata);

         (function(predata) {
             $("#delete" + i).click(function() {
                 deleteGradeApi(predata.id);
             });
         })(predata);

     }

     $('#add_grade').click(function() {
         showAddGradeDialog();
     });
 }

 function deleteGradeApi(gradeId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/grade/delete",
         type: "POST",
         cache: false,
         data: { id: gradeId, loginName: userName },
         success: function(result) {
             refleshGradeList();
         }
     });
 }


 function showGradeChangeDialog(data) {
     dialog1 = dialog({
         width: 400,
         title: '修改年级',
         content: GradeChangeDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#gradename").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 changeGradeApi(val1, data.id);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog1.showModal();
     $('#gradename').val(data.gradeName);
 }

 function changeGradeApi(p, gradeId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/grade/update",
         type: "POST",
         cache: false,
         data: { id: gradeId, gradeName: p },
         success: function(result) {
             refleshGradeList();
         }
     });
 }

 function showAddGradeDialog() {
     dialog1 = dialog({
         width: 400,
         title: '添加年级',
         content: GradeAddDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#gradename").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 addGradeApi(val1);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog1.showModal();
 }


 function addGradeApi(p) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/grade/add",
         type: "POST",
         cache: false,
         data: { gradeName: p },
         success: function(result) {
             refleshGradeList();
         }
     });

 }


 /////////////////////////////////////////////////
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //             我是分割线/科目管理              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //////////////////////////////////////////////////

 function getSubjectData() {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/suject/list",
         type: "POST",
         cache: false,
         success: function(result) {
             dealSubjectData(result);
         }
     });
 }


 //科目  逻辑处理
 function dealSubjectData(p) {
     $('#main_content').append(subjectListContent);
     for (var i = 0; i < p.data.list.length; i++) {
         var predata = p.data.list[i];
         var newdata = '<tr><td style="text-align:center"">' +
             predata.subjectName +
             '</td><td><button class="btn waves-effect waves-light blue" id="change' +
             i +
             '">修改</button></td><td><button class="btn waves-effect waves-light blue" id="delete' +
             i +
             '">删除</button></td></tr>"';

         $('#td_subjectlist').append(newdata);
         (function(predata) {
             $("#change" + i).click(function() {
                 showSubjectChangeDialog(predata);
                 return false;
             });

         })(predata);


         (function(predata) {
             $("#delete" + i).click(function() {
                 deleteSubjectApi(predata.id);
             });
         })(predata);


     }
     $('#add_grade').click(function() {
         showaddsubjectdialog();
     });

 }


 function showSubjectChangeDialog(data) {
     dialog1 = dialog({
         width: 400,
         title: '修改科目',
         content: subjectChangeDialogContent,
         okValue: '确定',
         ok: function() {
             var val1 = $("#subjectname").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 changeSubjectApi(val1, data.id);
             }
         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog1.showModal();
     $('#subjectname').val(data.subjectName);
 }


 function showaddsubjectdialog() {
     dialog1 = dialog({
         width: 400,
         title: '添加科目',
         content: subjectAddDialogContent,
         okValue: '确定',
         ok: function() {

             var val1 = $("#subjectname").val();
             if (isEmpty(val1)) {
                 alert("输入有误！");
             } else {
                 addSubjectApi(val1);
             }

         },
         cancelValue: '取消',
         cancel: function() {}
     });
     dialog1.showModal();
 }


 function addSubjectApi(p) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/suject/add",
         type: "POST",
         cache: false,
         data: { subjectName: p },
         success: function(result) {
             refleshSubjectList();
         }
     });

 }


 function changeSubjectApi(p, subjectId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/suject/update",
         type: "POST",
         cache: false,
         data: { id: subjectId, subjectName: p },
         success: function(result) {
             refleshSubjectList();
         }
     });

 }


 function deleteSubjectApi(subjectId) {
     $.ajax({
         url: "http://47.88.153.88:8080/app-cms-web/v1/web/suject/delete",
         type: "POST",
         cache: false,
         data: { id: subjectId, loginName: userName },
         success: function(result) {
             refleshSubjectList();
         }
     });

 }
 /////////////////////////////////////////////////
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                 我是分割线                   //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //                                              //
 //////////////////////////////////////////////////



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



 function showLoadingDialog() {
     laodingDialog.showModal();
 }



 function hideLoadingDialog() {
     laodingDialog.close();
 }


 //禁止按钮点击
 function disEnableButton() {

 }

 //恢复按钮点击
 function EnableButton() {

 }

 function isEmpty(obj) {
     for (var name in obj) {
         return false;
     }
     return true;
 };