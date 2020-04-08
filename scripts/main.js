import { dataCourses } from './dataCourses.js';
import { dataEstudiante } from './dataStudent.js';
var estudianteTbody = document.getElementById('student');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditos = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxCreditos = document.getElementById("search-box-creditos");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
renderCoursesInTable(dataCourses);
renderEstudiantesInTable(dataEstudiante);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderEstudiantesInTable(students) {
    console.log('Introduciendo estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td> Codigo</td>\n                            <td>" + student.codigo + "</td>";
        estudianteTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td> C\u00E9dula </td>\n                           <td>" + student.cedula + "</td>";
        estudianteTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td> A\u00F1os </td>\n                          <td>" + student.edad + "</td>";
        estudianteTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td> Direccion </td>\n                          <td>" + student.direccion + "</td>";
        estudianteTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td> Tel\u00E9fono </td>\n                          <td>" + student.telefono + "</td>";
        estudianteTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCreditos() {
    var text = inputSearchBoxCreditos.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditos(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCreditos(valor, courses) {
    return valor === '' ? dataCourses : courses.filter(function (c) {
        return c.credits <= Number(valor);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
