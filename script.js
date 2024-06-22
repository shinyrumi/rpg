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
    alert("잘못된 아이디입니다. 프로그램을

