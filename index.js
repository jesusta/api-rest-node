const oper=require('./operaciones.js');
oper.saludar("Monica G");
oper.potencia(2,5);

var result=function()
{
    var x=25,y=2;
    var r=x*2;
    console.log("El resultado es: ",r);
}
result();

//Pasar funciones como parámetros
function bienvenida(nombre)
{
    console.log(nombre, 'Bienvenido a Javascript desde Node JS!');
}
var llamarfunc= function(method, nom){
 method(nom);
}
var x= 'Daniela';
llamarfunc(bienvenida, x);
