let i = 0;
let moneda = parseFloat (prompt ("ingrese una cantidad:"));
while (isNaN(moneda)) {
    alert ("debe ingresar un numero");
    moneda = parseFloat (prompt("ingrese un monto:"));
}
while (moneda <= i){
    alert ("el monto debe ser mayor a cero")
    moneda = parseFloat (prompt("ingrese una cantidad:"));
}
let tipoMoneda = parseFloat (prompt("ingrese el tipo de moneda: 1=U$S; 2=EUR"));
let resultado;
switch (tipoMoneda) {
    case 1:
        resultado = moneda * 0.0013;
        console.log(resultado);
        break;
    case 2:
        resultado = moneda * 0.0010;
        console.log(resultado);
        break;
    default:
        while (isNaN(tipoMoneda)) {
            alert("debe ingresar un tipo de moneda");
            break
        }
}
let saludo = () => {
    let nombre = prompt("ingrese su nombre: ");
    alert("hasta pronto " + nombre);
}
let programaMoneda = parseInt(prompt("ingrese '1' si desea hacer un cambio de moneda"));
if (programaMoneda === 1){
    alert("usted acepta realizar un cambio de moneda");
}
else{
    saludo()
}

