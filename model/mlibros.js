var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

var sqma = new mongoose.Schema({
    Isbn: { type: String, required: "ISBN es obligatorio" },
    Titulo: { type: String, required: "Título es obligatorio" },
    fechEdicion: { type: String, required: "Fecha edición es obligatoria" },
    numPaginas: { type: Number, required: "Número de páginas es obligatorio" },
    cantEjemplares: { type: Number, required: "Cantidad de ejemplares es obligatoria" },
    cantEjemplaresDisponibles: { type: Number, required: "Cantidad de ejemplares disponibles es obligatoria" },
    Sinopsis: { type: String, required: "Sinopsis es obligatoria" },
    tipoPresentacion: { type: String, required: "Tipo de presentación es obligatorio" },
    tipoLiteratura: { type: String, required: "Tipo de literatura es obligatorio" },
    Autor: {
        Nombre: { type: String, required: "Nombre del autor es obligatorio" },
        Apellidos: { type: String, required: "Apellidos del autor son obligatorios" },
        fechPub: { type: String },
        Premios: { type: [String] },
        fecFall: { type: String },
    },
});

module.exports = mongoose.model('Libro',sqma) ;