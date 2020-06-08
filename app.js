const forms = document.querySelector('.input-from');
forms.addEventListener('submit', createCourseLists);
const courseNum = document.querySelector('.input-group');
function createCourseLists(e){
  let index = courseNum.value;
  
  while(index > 0){
    const li = document.querySelector('li');
    let list;
    list = `
    <table>
      <tr>
        <th>Course Name</th>
        <th>Course unit</th>
        <th>Course Grade</th>
      </tr>
      <tr>
        <td><input type="text" class="input-table CourseName"></td>
        <td><input type="text" class="input-table unit"></td>
        <td><input type="text" class="input-table grade"></td>
      </tr>
    </table>
    `
    li.innerHTML = list;
    console.log(li);
    index--;
  }
  e.preventDefault();
}