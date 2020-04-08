import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataEstudiante } from './dataStudent.js'; 

let estudianteTbody: HTMLElement = document.getElementById('student')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxCreditos: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-creditos")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditos.onclick = () => applyFilterByCreditos();

renderCoursesInTable(dataCourses);
renderEstudiantesInTable(dataEstudiante);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

function renderEstudiantesInTable(students: Student[]): void{
  console.log('Introduciendo estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td> Codigo</td>
                            <td>${student.codigo}</td>`;
    estudianteTbody.appendChild(trElement);
    
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td> Cédula </td>
                           <td>${student.cedula}</td>`;
    estudianteTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td> Años </td>
                          <td>${student.edad}</td>`;
    estudianteTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td> Direccion </td>
                          <td>${student.direccion}</td>`;
    estudianteTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td> Teléfono </td>
                          <td>${student.telefono}</td>`;
    estudianteTbody.appendChild(trElement);

  });
}

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreditos(){
  let text = inputSearchBoxCreditos.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditos(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCreditos(valor: string, courses: Course[]){
  return valor === '' ? dataCourses : courses.filter( c =>
    c.credits <= Number(valor));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}




