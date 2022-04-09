const conexion = require('../config/conexion');
//para poder obtener los valores enviado en la api con req.body
var express = require('express') //llamamos a Express
const bodyParser = require('body-parser');
var app = express()
//para que los parametros los acepte en Json
app.use(bodyParser.json())              
var port = process.env.PORT || 8000  

//-- para dar accesos desde cualquier servidor
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.get('/usuarios', function(req, res) {
    //res.json({ mensaje: '¡Listando registros!' })  
    let sql="select * from usuarios order by id"
   conexion.query(sql,(err,rows)=>{
       if(err) throw err;
       else{
           res.json(rows)
       }
   })
  })
  
  app.get('/usuarios/:id', function(req, res) {
    conexion.query("select * from usuarios where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
   })
 
   
//--- listar usuarios
//--guardar
//-- Insertar un usuario
app.post('/usuarios', function(req, res) {
  let sql = "insert into  usuarios set ?"
  const fecha=new Date
  console.log('Registro recibido: ',req.body);
  let poststr = {
      documento: req.body.documento,
      nombres : req.body.nombres,
      apellidos: req.body.apellidos,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      correo: req.body.correo,
      modified: fecha
  }
  conexion.query(sql, poststr, function (error, results) {
  if (error) throw error;
  if (results.affectedRows) {
   res.json({status: 'Registro guardado'})
 }
 else
   res.json({status: 'No se pudo guardar'})
  
});  
})//End app.post

//--actualizar
app.put('/usuarios', function (req, res) {
  const fecha=new Date
let sql = "update usuarios set documento= ?,nombres= ?,apellidos = ?,direccion =?, telefono = ?,correo= ?, modified = ? where id = ?"
  conexion.query(sql, [req.body.documento,req.body.nombres,req.body.apellidos,req.body.direccion,req.body.telefono,req.body.correo,fecha,req.body.id], function (error, results) {
     if (error) throw error;
     if (results.affectedRows) {
      res.json({status: 'Registro actualizado'})
    }
    else
      res.json({status: 'No se pudo actualizar'})
   });
});



//--eliminar
//---- eliminar un registro
app.delete('/usuarios/:id', function(req, res) {
  let sql ="delete from usuarios where id = ?"
  conexion.query(sql, [req.params.id], function (error, results) {
     if (error) throw error;
     if (results.affectedRows) {
       res.json({status: 'Registro eliminado'})
     }
     else
       res.json({status: 'No se pudo eliminar'})
   });
})


 //--- define las rutas de la API
// se puede probar con Postman
//http://localhost:8000/
app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })  
})

//http://localhost:8000/usuarios
 app.get('/usuarios', function(req, res) {
  res.json({ mensaje: '¡Listando registros!' })  
})
//--- listar usuarios
//--guardar
app.post('/usuarios', function(req, res) {
    res.json({ mensaje: 'Método post' })  
  })
//--actualizar
app.put('/usuarios', function(req, res) {
    res.json({ mensaje: 'Método put actualizar' })  
  })
//--eliminar
   app.delete('/usuarios/:id', function(req, res) {
    res.json({ mensaje: 'Método delete' })  
  })
  // iniciamos nuestro servidor
  app.listen(port)
  console.log('API escuchando en el puerto ' + port)
  