const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const rlibros = require('./routes/rlibros');
const cors = require('cors');
const mongoose = require('mongoose');


const hostname = 'localhost';
const port = 3000;

//--------------------------------------------------------
// CONEXION A MONGODB
//--------------------------------------------------------

var bdURL = 'mongodb://127.0.0.1:27017/biblio' ;
mongoose.connect( bdURL ) ;

// CONFIGURACION DE LOS EVENTEOS DE LA CONEXION

mongoose.connection.on( 'connected'   , function() {
     console.log( "Conexion a mongodb se realizo en: " + bdURL ) ;
     } ) ;
mongoose.connection.on( 'error'       , function(err) { 
    console.log( "ERROR: no hay conexión con mongodb: " + err ) ;
    } ) ;
mongoose.connection.on( 'disconnected', function(msg) { 
    console.log( "Desconexión a mongodb realizada con exito: " + msg ) ;
    } ) ;

// CUANDO NODE SE DESCONECTA DE MONGODB

process.on( 'SIGINT',function() {
        mongoose.connection.close( function() {
            console.log( "Conexión a mongodb terminada por finalización del servidor" ) ;
            process.exit(0) ;
        } ) ;
    } ) ;

//--------------------------------------------------------



// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
rlibros(app);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
