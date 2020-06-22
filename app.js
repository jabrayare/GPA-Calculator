class course{
  constructor(course,units,grade){
    this.course = course;
    this.units = units;
    this.grade = grade;
  }
}
class UI{
  // Adds items to local storage.
  addToLocalStorage(courseName,units,grade){
    const courseObj = {
      courseName: courseName,
      courseUnits: Number(units),
      courseGrade: grade.toUpperCase()
    };
    let courseInfo = [];
    if(localStorage.getItem('item') === null){
      courseInfo = [];
    }
    else{
      courseInfo = JSON.parse(localStorage.getItem('item'));
    }
    courseInfo.push(courseObj);
    localStorage.setItem('item',JSON.stringify(courseInfo));
  }
  // Gets items from local storage to tables in the UI.
  addCourseToList(){
    const list = document.querySelector('.table-list');
    const courseInfoLocal = JSON.parse(localStorage.getItem('item'));
    const row = document.createElement('tr');
    row.className = 'row';
    courseInfoLocal.forEach(element =>{
    // Creating the table row element.
    row.innerHTML = `
    <td>${element.courseName}</td>
    <td><input class ="units userInput" type="text" disabled value = ${element.courseUnits}></td>
    <td><input class ="grade userInput" type="text" disabled value = ${element.courseGrade}></td>
    `
    })
    list.appendChild(row);
  }
  
  clearFields(){
    document.querySelector('.courseName').value = '';
    document.querySelector('.units').value = '';
    document.querySelector('.grade').value = '';
  }
  displayMessage(message,className){
    const containerList = document.querySelector('.card');
    const head1 = document.querySelector('.head');
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    containerList.insertBefore(div,head1);
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  evaluteLetterGrade(letterGrade){
    if(letterGrade === 'A'){
      return 4.0;
    }
    else if(letterGrade === 'A-'){
      return 3.7;
    }
    else if(letterGrade === 'B+'){
      return 3.3;
    }
    else if(letterGrade === 'B'){
      return 3.0;
    }
    else if(letterGrade === 'B-'){
      return 2.7;
    }
    else if(letterGrade === 'C+'){
      return 2.3;
    }
    else if(letterGrade === 'C'){
      return 2.0;
    }
    else if(letterGrade === 'C-'){
      return 1.7;
    }
    else if(letterGrade === 'D+'){
      return 1.3;
    }
    else if(letterGrade === 'D'){
      return 1.0;
    }
    else{
      return 0.0;
    }
  }
  calculateGPA(gradeArr,unitsArr){
    // Need to get all the units, and grade user inputs as arrays.
    function sum(arr) {
      let sum = 0;
      for(let i = 0; i < arr.length; i++){
        sum += arr[i];
      }
      return sum;
    }
    let sumOfGradeUnits = sum(gradeArr);
    let sumOfUnits = sum(unitsArr);
    let gpa = sumOfGradeUnits/sumOfUnits;
    console.log(gpa.toFixed(1));
  }
  deleteFromLocalStorage(){
    // localStorage.clear();
  }
}


const studentCourse = document.querySelector('.input-form');
studentCourse.addEventListener('submit', function(e){
  const courseName = document.querySelector('.courseName').value;
  const units = document.querySelector('.units').value;
  const grade = document.querySelector('.grade').value;
  const ui = new UI();
  if(courseName != '' && units != '' && grade != ''){
  ui.addToLocalStorage(courseName,units,grade);
  ui.addCourseToList();
  ui.displayMessage(`course added!`,'success');
  ui.clearFields();
  }
  else{
    ui.displayMessage('Please fill all the fields!','error');
  }
  ui.deleteFromLocalStorage();
  e.preventDefault();
})

const calcGPA = document.querySelector('.calculateGPA');
calcGPA.addEventListener('click',function(e){
  const ui = new UI();

  const items = JSON.parse(localStorage.getItem('item'));
  console.log(items);
  let mult = [];
  let unitsC = [];
  let letterGrade = "";
  let gradePoint = 0;
  let units = "";
    items.forEach(element => {
    letterGrade = element.courseGrade;
    units = Number(element.courseUnits);
    gradePoint = ui.evaluteLetterGrade(letterGrade,units);
    mult.push(units*gradePoint)
    unitsC.push(units);
    });
  console.log(mult);
  console.log(unitsC);
  ui.calculateGPA(mult,unitsC);
  window.reload = changeBackgroundColor();
  e.preventDefault();
})
function changeBackgroundColor(){
  document.querySelector('body').style.backgroundColor = 'red';
  setTimeout(() => {
    document.querySelector('body').style.backgroundColor = '#333';
  }, 2000);
}

