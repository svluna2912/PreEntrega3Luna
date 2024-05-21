let IngreseUnaCantidad = prompt("Ingrese una cantidad");
if(IngreseUnaCantidad < 10000){
    alert("ingrese un valor mayor o igual a diez mil")
}
else if(IngreseUnaCantidad >= 10000){
    alert("la cantidad ingresada es de: " + IngreseUnaCantidad + " pesos ")
}
else {
    alert("la cantidad ingresada es incorrecta!, ingrese un valor expresado en numeros")
}