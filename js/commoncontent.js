var teacherListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS > <a href="#">用户管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_user">添加用户</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>用户ID</th>' +
    '<th>年级</th>' +
    '<th>姓名</th>' +
    '<th>科目</th>' +
    '<th>帐号</th>' +
    '<th>密码</th>' +
    '<th>操作1</th>' +
    '<th>操作2</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_userlist"></tbody></table></div>';



var addTeacherDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="username" name="username" type="text" class="validate"/>' +
    '<label for="username">姓名</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="password" name="password" type="text" class="validate"/>' +
    '<label for="password">密码</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="subject_input">' +
    '<select id="add_subject_select">' +
    '</select>' +
    '<label>科目</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="grade_input">' +
    '<select multiple id="add_grade_select">' +
    '</select>' +
    '<label>年级</label>' +
    '</div>' +
    '</div>' +

    '</form>';



var changeTeacherDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="username" name="username" type="text" class="validate"/>' +
    '<label class="active" for="username">姓名</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="password" name="password" type="text" class="validate"/>' +
    '<label class="active" for="password">密码</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<select id="change_subject_select">' +
    '</select>' +
    '<label>科目</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<select multiple id="change_grade_select">' +
    '</select>' +
    '<label>年级</label>' +
    '</div>' +
    '</div>' +

    '</form>';




var termListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS > <a href="#">学期管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_user">添加学期</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table style="width:80%;">' +
    '<thead>' +
    '<tr>' +
    '<th>学期ID</th>' +
    '<th>名称</th>' +
    '<th style="width:25%;">操作1</th>' +
    '<th style="width:20%;">操作2</th>' +
    '<th style="width:20%;">操作3</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_termlist"></tbody></table></div>';


var termChangeDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="termname" name="termname" type="text" class="validate"/>' +
    '<label class="active" for="termname">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';



var termAddDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="termname" name="termname" type="text" class="validate"/>' +
    '<label  for="termname">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';



var gradeListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS/<a href="#">年级管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_grade">添加年级</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table style="width:50%;">' +
    '<thead>' +
    '<tr>' +
    '<th style="width:50%;text-align:center">年级</th>' +
    '<th style="width:25%;">操作1</th>' +
    '<th style="width:25%;">操作2</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_gradelist"></tbody></table></div>';




var GradeChangeDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="gradename" name="gradename" type="text" class="validate"/>' +
    '<label class="active" for="gradename">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';





var GradeAddDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="gradename" name="gradename" type="text" class="validate"/>' +
    '<label for="gradename">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';






var subjectListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS/<a href="#">科目管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_grade">添加科目</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table style="width:50%;">' +
    '<thead>' +
    '<tr>' +
    '<th style="width:50%;text-align:center">科目</th>' +
    '<th style="width:25%;">操作1</th>' +
    '<th style="width:25%;">操作2</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_subjectlist"></tbody></table></div>';






var subjectChangeDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="subjectname" name="subjectname" type="text" class="validate"/>' +
    '<label class="active" for="subjectname">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';




var subjectAddDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="subjectname" name="subjectname" type="text" class="validate"/>' +
    '<label for="subjectname">名称</label>' +
    '</div>' +
    '</div>' +

    '</form>';



var courseManageList = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS > <a href="main.html">学期管理</a> > <a href="#">课程管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_user">添加课程</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table style="width:80%;">' +
    '<thead>' +
    '<tr>' +
    '<th>课程ID</th>' +
    '<th>年级</th>' +
    '<th>科目</th>' +
    '<th style="width:25%;">操作1</th>' +
    '<th style="width:20%;">操作2</th>' +
    '<th style="width:20%;">操作3</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_courselist"></tbody></table></div>';




var courseChangeDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="subject_input">' +
    '<select id="change_subject_select">' +
    '</select>' +
    '<label>科目</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="grade_input">' +
    '<select id="change_grade_select">' +
    '</select>' +
    '<label>年级</label>' +
    '</div>' +
    '</div>' +

    '</form>';



var courseAddDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="subject_input">' +
    '<select id="add_subject_select">' +
    '</select>' +
    '<label>科目</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="grade_input">' +
    '<select id="add_grade_select">' +
    '</select>' +
    '<label>年级</label>' +
    '</div>' +
    '</div>' +

    '</form>';




var classListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS > <a href="main.html">学期管理</a> > <a href="coursemanage.html">课程管理</a> > <a href="#">班级管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_class">添加班级</button>' +
    '</div>' +
    '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>班级ID</th>' +
    '<th>名称</th>' +
    '<th>课时</th>' +
    '<th>老师</th>' +
    '<th>开始时间</th>' +
    '<th>结束时间</th>' +
    '<th>操作1</th>' +
    '<th>操作2</th>' +
    '<th>操作3</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody id="td_classlist"></tbody></table></div>';





var addClassDialogContent = ' <form>' +

    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>开始时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test1" placeholder="点击此处选择日期与时间" lay-key="1">' +
    '</div>' +
    '</div>' +

    '</div>' +


    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>结束时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test1-1" placeholder="点击此处选择日期与时间" lay-key="2">' +
    '</div>' +
    '</div>' +

    '</div>' +


    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="name" name="name" type="text" class="validate"/>' +
    '<label for="name">名称</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="coursehours" name="coursehours" type="text" class="validate"/>' +
    '<label for="coursehours">课时</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="add_teacher_select">' +
    '</select>' +
    '<label>老师</label>' +
    '</div>' +
    '</div>' +

    '</form>';





var changeClassDialogContent = ' <form>' +

    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>开始时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test2" placeholder="点击此处选择日期与时间" lay-key="3">' +
    '</div>' +
    '</div>' +

    '</div>' +


    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>结束时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test2-1" placeholder="点击此处选择日期与时间" lay-key="4">' +
    '</div>' +
    '</div>' +

    '</div>' +



    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="name" name="name" type="text" class="validate"/>' +
    '<label class="active" for="name">名称</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="coursehours" name="coursehours" type="text" class="validate"/>' +
    '<label class="active" for="coursehours">课时</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="change_teacher_select">' +
    '</select>' +
    '<label>老师</label>' +
    '</div>' +
    '</div>' +

    '</form>';







var lessonListContent = '<div class="card-panel" style="background-color: rgba(255, 255, 255, 0.5);">' +
    '当期位置：TMS > <a href="main.html">学期管理</a> > <a href="coursemanage.html">课程管理</a> > <a href="classmanage.html">班级管理</a> > <a href="#">课次管理</a><button class="btn waves-effect waves-light blue" style="margin-left: 20px;" id="add_class">添加课次</button>' +
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
    '<tbody id="td_userlist"></tbody></table></div>';




var addLessonDialogContent = ' <form>' +

    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>开始时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test1" placeholder="点击此处选择日期与时间" lay-key="1">' +
    '</div>' +
    '</div>' +

    '</div>' +


    '<div class="row">' +

    '<div class="layui-inline">' +
    '<label>结束时间</label>' +
    '<div class="layui-input-inline">' +
    '<input type="text" class="layui-input" id="test1-1" placeholder="点击此处选择日期与时间" lay-key="2">' +
    '</div>' +
    '</div>' +

    '</div>' +


    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="add_m_select">' +
    '</select>' +
    '<label>教材</label>' +
    '</div>' +
    '</div>' +



    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="add_teacher_select">' +
    '</select>' +
    '<label>老师</label>' +
    '</div>' +
    '</div>' +



    '</form>';



var changeLessonDialogContent = ' <form>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="start_time" name="start_time" type="date" class="validate"/>' +
    '<label class="active" for="start_time">开始时间</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12">' +
    '<input id="end_time" name="end_time" type="date" class="validate"/>' +
    '<label class="active" for="end_time">结束时间</label>' +
    '</div>' +
    '</div>' +

    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="change_m_select">' +
    '</select>' +
    '<label>教材</label>' +
    '</div>' +
    '</div>' +



    '<div class="row">' +
    '<div class="input-field col s12" id="teacher_input">' +
    '<select id="change_teacher_select">' +
    '</select>' +
    '<label>老师</label>' +
    '</div>' +
    '</div>' +

    '</form>';