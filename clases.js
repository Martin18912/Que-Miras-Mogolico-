class Donante {
    constructor(name, dir, tel) {
       this.name = name;
       this.dir = dir;
       this.tel = tel;
    }
    
    todo() {
        var todo = (this.name + " " + this.dir + " " + this.tel);
        return todo;
    }
 
    getName() {
       return this.name;
    }
 
    getDir() {
       return this.dir;
    }
 
    getTel() {
       return this.tel;
    }
    
 }
 
 class Donacion extends Donante {
    constructor(nombre, direccion, telefono, modo, monto, comentarios) {
       super(nombre, direccion, telefono);
       this.modo = modo;
       this.monto = monto;
       this.comentarios = comentarios;
    }
 }
 