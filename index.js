
const express = require('express');
const app = express();
const mysql = require('mysql2');
//Motor de plantilla
const hbs = require('hbs');
//Encontrar archivos
const path = require('path');
//Para enviar mails
const nodemailer = require('nodemailer');
const { ifError } = require('assert');
//Variables de entorno
require('dotenv').config();

//Configuramos el Puerto
const PORT = process.env.PORT || 9000; 

//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

//Configuramos el motor de plantillas de HBS
app.set('view engine', 'hbs');
//Configuramos la ubicación de las plantillas
app.set('views', path.join(__dirname, 'views'));
//Configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Conexión a la Base de Datos
/*const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) =>{
    if(err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`);
})*/

//Rutas de la Aplicación
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Home'
    })
})



app.get('/comocomprar', (req, res) => {
    let sql = "select * from comocomprar"
        conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log(result);
            res.render('comocomprar', {
                titulo: 'comocomprar',
                datos: result
    })     
  })
})



app.get('/productos', (req, res) =>{
    res.render('productos', {
        titulo: 'Productos'
    })

})

app.get('/contacto', (req, res) => {    
    res.render('contacto') 
    
  })


app.post('/contacto', (req, res) =>{
    const nombre = req.body.nombre;
    const email = req.body.email;

    res.send('Gracias por Comunicarse, a la brevedad le responderemos su consulta. Muchas Gracias. LodeLo')
        
    let datos = {
        nombre: nombre,
        email: email
    }
    //creamos una funcion para enviar el mail
     async function envioMail(){
        //configuramos la cuenta de envío
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            },            
            tls: {
                rejectUnauthorized: false
              }
                        
        });
        //envío del mail
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "Gracias por comunicarse con lodeLo",
            text: 'Muchas gracias por su consulta, a la brevedad nos comunicaremos con Ud.'
            
        })
          }                                  
              
    
    /*let sql = "INSERT INTO contacto set ?";
    
    conexion.query(sql,datos, function(error){
        conexion.query(sql,datos, function(error){
            if (error) throw error;
            console.log('1 registro insertado');
            envioMail().catch(console.error);

        })
        })
        })*/
                
 

    app.post('/comocomprar', (req, res) =>{    
    const articulo = req.body.articulo;
    const precio = req.body.precio;
    const comentarios = req.body.comentarios;
    
    let datos = {
        articulo: articulo,
        precio: precio,
        comentarios: comentarios
    }   

    let sql = "INSERT INTO comocomprar set ?";

    conexion.query(sql, datos, function(err){
        if (err) throw err;
            console.log(`1 Registro insertado`);
            res.render('enviado')
        })
    })

    app.post('/delete', (req, res) => {

        console.log(req.body.idProducto);
    
       /* let sql = "DELETE FROM comocomprar where idProducto = " + req.body.idProducto + "";
        console.log(sql);
        conexion.query(sql, function(err, result){
            if(err) throw err;
            console.log('Dato eliminado: ' + result.affectedRows);
            res.redirect('comocomprar')
        })
    }) */

    app.post('/update', (req, res) => {

        const articulo = req.body.articulo;
        const precio = req.body.precio;
        const comentarios = req.body.comentarios;
        const idProducto = req.body.idProducto;
    
                
    /*let sql = "UPDATE comocomprar SET articulo = '" 
    + articulo
    + "', precio = '" 
    + precio 
    + "', comentarios = '" 
    + comentarios
    + "' WHERE idProducto = " 
    + idProducto

    console.log(req.body.idProducto);

    res.send('Has actualizado el articulo');

    console.log(sql);
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Dato Actualizado: ' + result.affectedRows);
            res.redirect('comocomprar')
    }) */

    res.json({
        prueba: 'Probando deploy sin conexion a la Database'
    })


    //Servidor a la escucha de las peticiones
    app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el Puerto: ${PORT}`);
    })























