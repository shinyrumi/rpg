var classroom = {
  students: JSON.parse(localStorage.getItem('students')) || {}
};

function saveData() {
  localStorage.setItem('students', JSON.stringify(classroom.students));
}

function submitRole() {
  var role = document.getElementById('role').value;
  var formContainer = document.getElementById('formContainer');
  if (role === '교사') {
    formContainer.innerHTML = `
      <form id="teacherForm">
        아이디를 입력해주세요: 
        <input type="text" id="teacherId"><br>
        <input type="button" value="제출" onclick="submitTeacher()">
      </form>
    `;
  } else if (role === '학생') {
    formContainer.innerHTML = `
      <form id="studentForm">
        이름을 입력해주세요: 
        <input type="text" id="studentName"><br>
        <input type="button" value="제출" onclick="submitStudent()">
      </form>
    `;
  } else {
    alert("잘못된 입력입니다. 프로그램을 종료합니다.");
  }
}

function submitTeacher() {
  var teacherId = document.getElementById('teacherId').value;
  if (teacherId === '드루미') {
    var formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = `
      <form id="addPointsForm">
        학생의 이름을 입력해주세요: 
        <input type="text" id="studentName"><br>
        포인트를 입력해주세요: 
        <input type="number" id="points"><br>
        <input type="button" value="제출" onclick="addPoints()">
      </form>
    `;
  } else {
    alert("잘못된 아이디입니다. 프로그램을 종료합니다.");
  }
}

function submitStudent() {
  var studentName = document.getElementById('studentName').value;
  var status = getStudentStatus(studentName);
  var message = `현재 ${status.name}은(는) ${status.points}포인트이며 ${status.level}레벨입니다.`;
  if (status.level !== '브론즈') {
    message += '\n축하합니다.';
  }
  alert(message);
}

function addPoints() {
  var studentName = document.getElementById('studentName').value;
  var points = parseInt(document.getElementById('points').value);
  var status = addStudentPoints(studentName, points);
  var message = `현재 ${status.name}은(는) ${status.points}포인트이며 ${status.level}레벨입니다.`;
  if (status.message) {
    message += '\n' + status.message;
  }
  alert(message);
}

function addStudentPoints(name, points) {
  if (!classroom.students[name]) {
    classroom.students[name] = {
      points: 0,
      level: '브론즈'
    };
  }
  var student = classroom.students[name];
  student.points += points;
  if (student.points < 0) student.points = 0;  // 포인트가 0 미만으로 떨어지지 않도록 설정
  var previousLevel = student.level;
  updateLevel(student);
  var message = '';
  if (student.level !== previousLevel) {
    message = '축하합니다. 승급하셨습니다.';
  }
  saveData();
  return {name: name, points: student.points, level: student.level, message: message};
}

function getStudentStatus(name) {
  if (classroom.students[name]) {
    var student = classroom.students[name];
    return {name: name, points: student.points, level: student.level};
  } else {
    return {name: name, points: 0, level: '브론즈'};
  }
}

function updateLevel(student) {
  if (student.points >= 30) {
    student.level = '마스터';
  } else if (student.points >= 20) {
    student.level = '다이아몬드';
  } else if (student.points >= 10) {
    student.level = '골드';
  } else if (student.points >= 5) {
    student.level = '실버';
  } else {
    student.level = '브론즈';
  }
}

