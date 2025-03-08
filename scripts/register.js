//constructor
function Student(name,age,g1,g2){
    this.name=name;
    this.age=age;
    this.g1=g1;
    this.g2=g2;
}
//Obteniendo los valores de los inputs de HTML
const inputName = document.getElementById("txtName");
const inputAge = document.getElementById("txtAge");
const inputG1 = document.getElementById("txtGrade1");
const inputG2 = document.getElementById("txtGrade2");

// Recuperar estudiantes guardados o inicializar arreglo vacío
let students = JSON.parse(localStorage.getItem("students")) || [];

// Registrar un nuevo estudiante
function register(){

    // Obtener valores ya recortados
    const name = inputName.value.trim();
    const age = inputAge.value.trim();
    const g1 = inputG1.value.trim();
    const g2 = inputG2.value.trim();

    // Verificar si algún campo está vacío
    if (name === "" && age === "" && g1 === "" && g2 === "") {
        msg_error("Todos los campos son obligatorios.");
    } else if (name === "") {
        msg_error("El nombre es obligatorio.");
    } else if (age === "") {
        msg_error("La edad es obligatoria.");
    } else if (isNaN(age) || parseInt(age) <= 0) {
        msg_error("La edad debe ser un número mayor a cero.");
    } else if (g1 === "") {
        msg_error("La calificación de la materia 1 es obligatoria.");
    } else if (isNaN(g1) || g1 < 0 || g1 > 10) {
        msg_error("La calificación de la materia 1 debe estar entre 0 y 10.");
    } else if (g2 === "") {
        msg_error("La calificación de la materia 2 es obligatoria.");
    } else if (isNaN(g2) || g2 < 0 || g2 > 10) {
        msg_error("La calificación de la materia 2 debe estar entre 0 y 10.");
    } else{
        let newStudent = new Student(inputName.value, inputAge.value, inputG1.value,inputG2.value);

        // Agregar el nuevo estudiante al arreglo 'students' para almacenarlo en la memoria local
        students.push(newStudent);

        // Guardar el arreglo de estudiantes actualizado en el almacenamiento local (localStorage), 
        // convirtiendo el arreglo en una cadena JSON para que pueda ser almacenado como texto
        localStorage.setItem("students", JSON.stringify(students));

        // Actualizar la interfaz de usuario llamando a la función displayStudents(), 
        // lo que mostrará la lista actualizada de estudiantes en la página
        displayStudents();

        // Limpiar los campos de entrada del formulario para que el usuario pueda ingresar nuevos datos
        inputName.value = "";
        inputAge.value = "";
        inputG1.value = "";
        inputG2.value = "";
    }    
}

// Mostrar los estudiantes registrados en pantalla
function displayStudents() {
    const tbody = document.querySelector("table tbody"); // Selecciona el <tbody>
    tbody.innerHTML = ""; // Limpia la tabla antes de renderizar

    let rows = ""; // Almacena las filas antes de insertarlas

    students.forEach((student, index) => {
        rows += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age ? student.age + ' años' : 'N/A'}</td>
                <td class="text-center">${student.g1 || 'N/A'}</td>
                <td class="text-center">${student.g2 || 'N/A'}</td>
                <td class="text-center">
                    <button onclick="deleteStudent(${index})" class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar ${student.name}">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.insertAdjacentHTML("beforeend", rows); // Inserta el HTML una sola vez

    // Inicializar tooltips de Bootstrap después de renderizar
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltip => new bootstrap.Tooltip(tooltip));
}


// Eliminar un estudiante
function deleteStudent(index){
    students.splice(index, 1); // Elimina el estudiante en la posición indicada
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
   
// Borrar todos los datos del ls
function clearStorage(){
    localStorage.removeItem("students");
    students = []; // Reiniciar el arreglo
    displayStudents();
}

// Mostrar estudiantes
//document.addEventListener("DOMContentLoaded", displayStudents);

  document.addEventListener('DOMContentLoaded', function () {

    // Mostrar estudiantes
    displayStudents();

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      var tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
      
    });
  });

// Funciones creadas para enviar alertas con sweet alert 2

// alerta de error
function msg_error(msg) {
    swal({
        type: '',
        title: '',
        text: '',
        html: '<lord-icon src="https://cdn.lordicon.com/azxkyjta.json" trigger="loop" colors="primary:#ffc738,secondary:#e83a30" style="width:128px;height:128px"></lord-icon>' +
            '<br>' +
            '<b><h3><strong>Atención :(</strong></h3></b>' +
            '<h5 style=\"text-align: center !important; margin-top: 20px\"><span class=\"text-danger fw-bold\">' + msg + '</span></h5>' +
            '<br>',
        animation: false,
        customClass: "animate__animated animate__tada",
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: 450,
    })
}