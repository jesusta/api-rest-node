const http = require("http"); //Se añade el módulo http
const host = 'localhost';
const port = 8000;
//Se crea la función de primera clase
const requestListener = function (req, res) {
    res.writeHead(200);//cod de estado  http ok
    res.end("Mi primer servidor web con Node.JS!"); //mensaje a mostrar en http
};
 
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log('Node.JS está funcionando en ** http://'+host+':'+port+'/');
    console.log("presione 'Ctr+C' para terminar");
});
