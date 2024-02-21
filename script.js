class Alumno {
    constructor(id, nombre, apellido, edad, materiasInscritas, calificaciones, grupo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.materiasInscritas = materiasInscritas;
        this.calificaciones = calificaciones;
        this.grupo = grupo;
    }
}

class Materia {
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}

class Calificacion {
    constructor(materia, score){
        this.materia = materia;
        this.score = score;
    }
}

class Grupo {
    constructor(id, nombre, alumnos){
        this.id = id;
        this.nombre = nombre;
    }
}

const inputs = []

const alumnos = []

alumnos.push(new Alumno(1, "Carlos", "Martinez", 20, [], [], null))
alumnos.push(new Alumno(2, "Alejandra", "Sanchez", 22, [], [], null))
alumnos.push(new Alumno(3, "Alberto", "Rodriguez", 21, [], [], null))

const grupos = []

grupos.push(new Grupo(1, "3A"))
grupos.push(new Grupo(1, "3B"))
grupos.push(new Grupo(1, "3C"))


const materias = []

materias.push(new Materia(1, "Pociones"))
materias.push(new Materia(2, "Defensa Contra Las Artes Oscuras"))
materias.push(new Materia(3, "Adivinación"))
materias.push(new Materia(4, "Herbología"))
materias.push(new Materia(5, "Historia de la Magia"))

let selectedAlumno = null
let selectedMateria = null

const inputNombre = document.getElementById("inputNombre")
const inputApellido = document.getElementById("inputApellido")
const inputEdad = document.getElementById("inputEdad")
const btnLimpiarAlumno = document.getElementById("btnLimpiarAlumno")
const btnGuardarAlumno = document.getElementById("btnGuardarAlumno")
const selectAlumnos = document.getElementById("selectAlumnos")
const calificacionTitle = document.getElementById("calificacionTitle")

const asignId = (coleccion) => {
    if (coleccion.length === 0) {
        return 1;
    }

    const idsExistentes = coleccion.map(e => e.id);
    
    const maxId = Math.max(...idsExistentes);

    for (let i = 1; i <= maxId + 1; i++) {
        if (!idsExistentes.includes(i)) {
            return i;
        }
    }

    return maxId + 1;
}

const cleanInputs = () => {
    inputNombre.value = ""
    inputApellido.value = ""
    inputEdad.value = 18
}

const renderAlumnoJson = () => {
    const pre = document.getElementById("preEl")
    pre.innerHTML = JSON.stringify(selectedAlumno)
}

const setAlumno = (event) => {
    const id = parseInt(event.target.value)
    selectedAlumno = alumnos.filter(a => a.id === id)[0]
    renderEditAlumno(selectedAlumno)
    renderAlumnoJson()
}

const setAlumnoGroup = (e) => {
    const id = e.target.value
    const group = grupos.find(g => g.id == id)

}

const renderSelectAlumnos = (alumnos) => {
    const contenedor = document.getElementById("selectContainer");
    contenedor.innerHTML = ""

    const selectAlumnos = document.createElement("select");
    selectAlumnos.name = "selectAlumnos";
    selectAlumnos.id = "selectAlumnos";
    selectAlumnos.classList.add("w-100", "form-control");

    alumnos.forEach(alumno => {
        const option = document.createElement("option");
        option.value = alumno.id; 
        option.textContent = `${alumno.id} - ${alumno.nombre} ${alumno.apellido}`; 
        selectAlumnos.appendChild(option);
    });

    contenedor.appendChild(selectAlumnos);
    document.getElementById("selectAlumnos").addEventListener("change", setAlumno)

}

const setGroup = (e) => {
    selectedAlumno.grupo = grupos.find(g => g.id == e.target.value)
    renderAlumnoJson()
}

const renderGroupSelector = () => {
    const contenedorGrupos = document.getElementById("groupContainer")

    contenedorGrupos.innerHTML = ""

    const grouph2 = document.createElement("h2")
    grouph2.textContent = "Selecciona grupo"

    contenedorGrupos.appendChild(grouph2)

    grupos.forEach(g => {
        const groupElement = document.createElement("button")
        groupElement.value = g.id
        groupElement.textContent = g.nombre
        groupElement.classList.add("btn", "btn-primary", "m-4")
        contenedorGrupos.appendChild(groupElement)
        groupElement.addEventListener("click", setGroup)
    })  

    renderAlumnoJson()
}

const registrarMateria = (e) => {
    const materiaId = parseInt(e.target.value)
    const materia = materias.find(m => m.id == materiaId)
    console.log(materia)

    selectedAlumno.materiasInscritas.push(materia)

    const calificacionMateria = new Calificacion(materia, null)
    console.log(calificacionMateria)
    selectedAlumno.calificaciones.push(calificacionMateria)

    renderEditAlumno(selectedAlumno)
    renderAlumnoJson()
}

const setSelectedMateria = (e) => {
    const materiaId = e.target.value
    selectedMateria = selectedAlumno.materiasInscritas.find(m => m.id == materiaId)

    renderCalificacionSection()
    renderAlumnoJson()
}

const sumarCalificacion = (e) => {
    let calificacion = selectedAlumno.calificaciones.find(c => c.materia.id == selectedMateria.id);
    
    if (calificacion && calificacion.score < 10) {
        calificacion.score++;
    } else {
        calificacion = new Calificacion(selectedMateria, 1);
    }

    renderCalificacionSection();
};

const restarCalificacion = (e) => {
    let calificacion = selectedAlumno.calificaciones.find(c => c.materia.id == selectedMateria.id);
    
    if (calificacion && calificacion.score > 0) {
        calificacion.score--;
    } else {
        calificacion = new Calificacion(selectedMateria, 0);
    }

    renderCalificacionSection();
};


const renderCalificacionSection = () => {

    const calificacionSection = document.getElementById("calificacionSection")

    calificacionSection.innerHTML = ""
    
    const h2 = document.createElement("h2");
    h2.id = "calificacionTitle";
    h2.classList.add("mt-2", "text-center", "w-100");
    calificacionSection.appendChild(h2);
    h2.innerHTML = `Calificación de ${selectedAlumno.nombre} ${selectedAlumno.apellido} en la materia ${selectedMateria.nombre}`
    
    const divCol1 = document.createElement("div");
    divCol1.classList.add("col-6", "row", "justify-center", "mt-4");

    const divCol1_1 = document.createElement("div");
    divCol1_1.classList.add("col-2");
    const btnDown = document.createElement("button");
    btnDown.id = "calificacionDOWN";
    btnDown.classList.add("btn", "btn-secondary", "text-center");
    divCol1_1.appendChild(btnDown);
    btnDown.innerHTML = "-"
    btnDown.addEventListener("click", restarCalificacion)
    
    const divCol1_2 = document.createElement("div");
    divCol1_2.classList.add("col-2");
    const pCalificacion = document.createElement("p");
    pCalificacion.id = "calificacionElement";
    divCol1_2.appendChild(pCalificacion);
    pCalificacion.innerHTML = selectedAlumno.calificaciones.find(c => c.materia.id == selectedMateria.id).score;
    
    const divCol1_3 = document.createElement("div");
    divCol1_3.classList.add("col-2");
    const btnUp = document.createElement("button");
    btnUp.id = "calificacionUP";
    btnUp.classList.add("btn", "btn-secondary", "text-center");
    divCol1_3.appendChild(btnUp);
    btnUp.innerHTML = "+"
    btnUp.addEventListener("click", sumarCalificacion)
    
    divCol1.appendChild(divCol1_1);
    divCol1.appendChild(divCol1_2);
    divCol1.appendChild(divCol1_3);
    
    calificacionSection.appendChild(divCol1);
    
    renderAlumnoJson()
}

const renderEditAlumno = (alumno) => {

    const calificacionSection = document.getElementById("calificacionSection")
    calificacionSection.innerHTML = ""

    const materiasInscritasContainer = document.getElementById("inscritasContainer")
    const materiasAElegirContainer = document.getElementById("aElegirContainer")

    materiasInscritasContainer.innerHTML = ""
    materiasAElegirContainer.innerHTML = ""

    if(alumno.materiasInscritas.length > 0){
        const inscritasH3 = document.createElement("h3")
        inscritasH3.innerHTML = "Selecciona para asignar calificación"
        materiasInscritasContainer.appendChild(inscritasH3)
    }

    const elegirH3 = document.createElement("H3")
    elegirH3.innerHTML = "Selecciona materia a registrar"
    materiasAElegirContainer.appendChild(elegirH3)


    const alumnoDescriptionH = document.getElementById("alumnoDescription")
    alumnoDescriptionH.innerHTML = `id:${alumno.id} ${alumno.nombre} ${alumno.apellido}`

    const materiasAlumno = alumno.materiasInscritas
    const materiasAlumnoIds = materiasAlumno.map(m => m.id)
    const materiasAElegir = []

    for(let m of materias){
        if(!materiasAlumnoIds.includes(m.id)){
            materiasAElegir.push(m)
        }
    }

    materiasAElegir.forEach( m => {
        const materiaElement = document.createElement("button")
        materiaElement.id = `materia${m.id}`
        materiaElement.classList.add("btn","btn-primary", "mt-2" ,"w-100")
        materiaElement.innerHTML = m.nombre
        materiaElement.value = m.id
        materiasAElegirContainer.appendChild(materiaElement)
        materiaElement.addEventListener("click", registrarMateria)
    })

    
    materiasAlumno.forEach( m => {
        const materiaElement = document.createElement("button")
        materiaElement.id = `materia${m.id}`
        materiaElement.classList.add("btn","btn-secondary", "mt-2" ,"w-100")
        materiaElement.innerHTML = m.nombre
        materiaElement.value = m.id
        materiasInscritasContainer.appendChild(materiaElement)
        materiaElement.addEventListener("click", setSelectedMateria)
    })

    renderGroupSelector()
    
}

const saveAlumno = () => {
    const id = asignId(alumnos)
    const nombre = inputNombre.value 
    const apellido = inputApellido.value
    const edad = inputEdad.value
    cleanInputs()
    const newAlumno = new Alumno(id, nombre, apellido, edad, [], [], null)
    alumnos.push(newAlumno)
    renderSelectAlumnos(alumnos)
}

btnLimpiarAlumno.addEventListener("click",cleanInputs)
btnGuardarAlumno.addEventListener("click",saveAlumno)

if(alumnos.length > 0){
    renderSelectAlumnos(alumnos)
}