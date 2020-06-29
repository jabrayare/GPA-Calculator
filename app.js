class Course{
  constructor(course,units,grade){
    this.course = course;
    this.units = units;
    this.grade = grade;
  }
}
class UI{
  // Gets items from local storage to tables in the UI.
  addCourseToList(course){
    // const courseObj = {
    //   courseName: courseName,
    //   courseUnits: Number(units),
    //   courseGrade: grade.toUpperCase()
    // };
    const list = document.querySelector('.table-list');
    // const courseInfoLocal = JSON.parse(localStorage.getItem('item'));
    const row = document.createElement('tr');
    row.className = 'row';
    // Creating the table row element.
    row.innerHTML += `
    <td>${course.course}</td>
    <td>${course.units}</td>
    <td>${course.grade}</td>
    `
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
    document.getElementById('gpa').innerHTML = gpa.toFixed(1);
  }
  deleteFromLocalStorage(){
    // localStorage.clear();
  }
}
// LS class.
class store{
  // Get courses.
  static getCourses(){
    let courses = [];
    if(localStorage.getItem('item') === null){
      courses = [];
    }
    else{
      courses = JSON.parse(localStorage.getItem('item'));
    }
    return courses;
  }
  // Display courses to UI.
  static displayCourses(){
    const courseInfo = store.getCourses();
    courseInfo.forEach(course =>{
      const ui = new UI();
    ui.addCourseToList(course);
    })
  }
  // Adds items to local storage.
  static addToLocalStorage(course){
    const courseInfo = store.getCourses();
    courseInfo.push(course);
    localStorage.setItem('item',JSON.stringify(courseInfo));
  }
  static clearLocalStorage(){
    localStorage.clear();
  }
}

// DOM LOAD event.
document.addEventListener('DOMContentLoaded',store.displayCourses);
const studentCourse = document.querySelector('.input-form');
studentCourse.addEventListener('submit', function(e){
  const courseName = document.querySelector('.courseName').value;
  const units = document.querySelector('.units').value;
  const grade = document.querySelector('.grade').value.toUpperCase();

  const ui = new UI();
  const course = new Course(courseName,units,grade);

  if(courseName != '' && units != '' && grade != ''){
  // ui.addToLocalStorage(courseName,units,grade);
  ui.addCourseToList(course);
  // Add to local storage.
  store.addToLocalStorage(course);
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
  const items = store.getCourses();
  console.log(items);
  let mult = [];
  let unitsC = [];
  let letterGrade = "";
  let gradePoint = 0;
  let units = "";
  console.log(items.course);
    items.forEach(element => {
    letterGrade = element.grade;
    units = Number(element.units);
    gradePoint = ui.evaluteLetterGrade(letterGrade,units);
    mult.push(units*gradePoint)
    unitsC.push(units);
    });
  console.log(mult);
  console.log(unitsC);
  if(mult.length !== 0){
  ui.calculateGPA(mult,unitsC);
  window.reload = changeBackgroundColor();
  }
  else{
    ui.displayMessage('Please fill all the fields!','error');
  }
  e.preventDefault();
})
function changeBackgroundColor(){
  document.querySelector('body').style.backgroundImage = "url('tenor.gif')";
  document.querySelector('.loading').style.display = 'block';
  setTimeout(() => {
    document.querySelector('body').style.backgroundColor = '#333';
    document.querySelector('.gpaBox').style.display = 'block'
    document.querySelector('.clearTable').style.display = 'block'
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('body').style.backgroundImage = '';
  }, 2000);
}
// clears courses from LS and UI.
document.querySelector('.clearCourse').addEventListener('click',function(e){
  setTimeout(() => {
    store.clearLocalStorage();
  window.location.reload();
  }, 500);
e.preventDefault();
})