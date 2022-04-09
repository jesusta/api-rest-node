function saludar (nombre)
{
    console.log(nombre,'Bienvenido a NodeJS');
}

function potencia(base,expo)
{
    console.log(' la potencia de ', base, ' elevado a ', expo, ' es: ',Math.pow(base,expo));
}

//saludar('Daniel');
//potencia(2,5);
//--exportar
exports.saludar = saludar;
exports.potencia = potencia;