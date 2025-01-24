var ctlrlibros = require('../controller/clibros.js');

module.exports = function(app) {
    //Obtener libros
    app.route('/api/getLibros')
        .get(ctlrlibros.getLibros);
    
    //Obtener un libro get
    app.route('/api/getLibro/:id')
        .get(ctlrlibros.getLibro);
    
    //Obtener un libro post
    app.route('/api/getLibro')
        .post(ctlrlibros.postLibro);
    
    //Agregar libro
    app.route('/api/AddBook')
        .post(ctlrlibros.AddBook);
    
    //Eliminar libro
    app.route('/api/DeleteBook/:id')
        .get(ctlrlibros.DeleteBook);

    //Obtener autores
    app.route('/api/getAutores')
        .get(ctlrlibros.getAutores);
    
    //Obtener un autor
    app.route('/api/getAutor')
        .post(ctlrlibros.getAutor);
    
    //Agregar autor
    app.route('/api/AddAuthor')
        .post(ctlrlibros.AddAuthor);

    //Eliminar autor
    app.route('/api/DeleteAuthor')
        .delete(ctlrlibros.DeleteAuthor);
    
    //Modificar autor
    app.route('/api/UpdateAuthor')
        .put(ctlrlibros.UpdateAuthor);
    
    //Modificar libro
    app.route('/api/UpdateBook')
        .put(ctlrlibros.UpdateBook);
};