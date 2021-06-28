let datosDonantes = [];
let nombreDonante = [];
let modosDonacion = [];
let tel = " ";
let dir = " ";
let contador = 0;
let montoDonacion = 0;
let mayorMonto = 0;
let montoTotal = 0;
//Realiado por Martin Castaldi Zamalvide 251514. Grupo: M1A.

function onFormSubmit1() {
    if(validate2()){   
        var formData = readFormData();
            nomdirtel();
            insertNewRecord(formData);
            estadisticas();
            if(document.getElementById("orden").checked){
                ordenMonto()
            }else{
                ordenName()
            }
            let array2 = obtenerModosDonacion();
            drawChart(); 
            datosIzquierda();
            resetForm2();   
        }        
}


function onFormSubmit2() {
    if (validate()) {
        datos();
        introcombo();
        resetForm1();
    }
}

function introcombo(){
    var select = document.getElementById("select"),
        txtval = document.getElementById("nombre").value,
        newoption = document.createElement("option"),
        newoptionval = document.createTextNode(txtval);
        newoption.appendChild(newoptionval);
        select.insertBefore(newoption, select.lastChild);
}

function datos(){
    var nombre = document.getElementById("nombre").value;   
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    let nuevodonante = new Donante(nombre, direccion, telefono);
    datosDonantes.push(nuevodonante);
}

function nomdirtel(){
    var nombre2 = document.getElementById("select").value;
        
    for (const donante of datosDonantes){
        if (donante.getName() === nombre2 ){
                tel = donante.getTel();
                dir = donante.getDir();
        }
    } 
}

function readFormData() {
    var formData = {};
    formData["nombre"] = document.getElementById("nombre").value;
    formData["direccion"] = dir;
    formData["telefono"] = tel;
    formData["select"] = document.getElementById("select").value;
    formData["modo"] = document.getElementById("modo").value;
    formData["monto"] = document.getElementById("monto").value;
    formData["comentario"] = document.getElementById("comentario").value;
    
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);   
    cell1.innerHTML = data.select + "(" + dir + "," + tel + ")" ;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.modo;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.monto; 
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.comentario;
    nombreDonante.push(data.select);
    modosDonacion.push(data.modo);  
}

function resetForm1() {
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
}

function resetForm2() {
    document.getElementById("monto").value = "";
    document.getElementById("comentario").value = ""; 
}

function validate(){ 
    valido = true;
    fallo = true;
    nombre = document.getElementById("nombre").value;
    direccion = document.getElementById("direccion").value;
    telefono = document.getElementById("telefono").value;
    if(nombre == " " || nombre == "" || direccion == "" || direccion == " " || telefono == "" || telefono == " "){
        valido = false;
        alert("Los Campos Nombre Direccion y Telefono son obligatorios");
        resetForm1();
        fallo = false;
    }
    if(fallo){
        for (const donante of datosDonantes){
            if (donante.getName() === nombre ){
                valido = false;
                alert("Nombre de donante repetido");
                resetForm1();
            }
        }
    }
    return valido;
}

function validate2(){
    valido = true;
    monto = document.getElementById("monto").value;
    nombre = document.getElementById("select").value
    if (monto < 1){
        valido = false;
        alert("El Monto de la Donacion debe ser mayor a 0");
    }
    if (monto > 0){
        monto = parseInt(monto);
    }
    var tipomonto = typeof monto;
    if(tipomonto != "number"){
        alert("No se admiten letras en el campo monto");
        valido = false;

    }
    if(nombre == "" || nombre == " "){
        valido = false;
        alert("No selecciono ningun nombre");
    }
    return valido;
}

function estadisticas(){
    var totalDonaciones = 0;
    var promedio = 0;
    contador = contador + 1;
    totalDonaciones = contador;
    montoDonacion = parseInt(montoDonacion) + parseInt(monto);
    promedio = montoDonacion / totalDonaciones;
    promedio = parseInt(promedio);
    document.getElementById("promedioDon").textContent=promedio;
    document.getElementById("cantidadDon").textContent=totalDonaciones;
    mayorDonante();
    drawChart();
}

function mayorDonante(){
    let cantmax = 0;
    let cant = 0;
    let nombre= nombreDonante[0];
    for(i = 0; i < nombreDonante.length; i++){
        for(j = 0; j < nombreDonante.length; j++){
            if(nombreDonante[i] === nombreDonante[j]){
                cant++;
            }
        }       
        if(cant > cantmax){
            cantmax = cant;
            nombre=nombreDonante[i]
        }
        cant = 0;
    }
    document.getElementById("mayorDon").textContent = "⭐" + nombre;
}

function ordenName() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("employeeList");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function ordenMonto() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("employeeList");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function filasResaltar(){
    let valor = parseInt(document.getElementById("resaltarmonto").value);
    let tabla2 = document.getElementById("employeeList");
    let filas = tabla2.getElementsByTagName("tr");

        if(document.getElementById("resaltar").checked){
            for(i=1; i < filas.length; i++){
                if(parseInt(filas[i].cells[2].innerHTML) == valor){
                    filas[i].style.backgroundColor = "yellow";
                }else{
                    filas[i].style.backgroundColor = "#9A9494" ;
                }
            }
        }else{
            for(i=1; i < filas.length; i++){
                filas[i].style.backgroundColor = "#9A9494";
            }
        }
}

function obtenerModosDonacion() {
    let cantidad = {};
    for (let i = 0; i < modosDonacion.length; i++) {
       let modo = modosDonacion[i];
       
       if (cantidad[modo] == null) {

        cantidad[modo] = 1;
       } else {
        cantidad[modo]++;
       }
    }
    return cantidad;
}

function datosIzquierda(){
     let monto = document.getElementById("monto").value;
     monto = parseInt(monto);
     montoTotal = parseInt(montoTotal) + parseInt(monto);
     if(mayorMonto < monto){
         console.log(monto);
         console.log(mayorMonto);
         mayorMonto = monto;
     }
     document.getElementById("montoTotal").textContent=montoTotal;
     document.getElementById("montoMayor").textContent=mayorMonto;
}