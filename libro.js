const backendUrl = 'http://localhost:3000';

    function generateBooksTable(books) {
      let table = `
        <table border="1" style="width: 100%; text-align: left;">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Título</th>
              <th>Fecha Edición</th>
              <th>Número de Páginas</th>
              <th>Ejemplares</th>
              <th>Disponibles</th>
              <th>Sinopsis</th>
              <th>Presentación</th>
              <th>Literatura</th>
              <th>Autor</th>
              <th>Fecha Publicación Autor</th>
              <th>Premios</th>
              <th>Fecha de Fallecimiento</th>
            </tr>
          </thead>
          <tbody>
      `;

      books.forEach(book => {
        const premios = book.Autor.Premios.join(", ");
        table += `
          <tr>
            <td>${book.Isbn}</td>
            <td>${book.Titulo}</td>
            <td>${book.fechEdicion}</td>
            <td>${book.numPaginas}</td>
            <td>${book.cantEjemplares}</td>
            <td>${book.cantEjemplaresDisponibles}</td>
            <td>${book.Sinopsis}</td>
            <td>${book.tipoPresentacion}</td>
            <td>${book.tipoLiteratura}</td>
            <td>${book.Autor.Nombre} ${book.Autor.Apellidos}</td>
            <td>${book.Autor.fechPub}</td>
            <td>${premios}</td>
            <td>${book.Autor.fecFall}</td>
          </tr>
        `;
      });

      table += `
          </tbody>
        </table>
      `;
      return table;
    }

    function generateBookTable(book) {
      const premios = book.Autor.Premios.join(", ");
      return `
        <table border="1" style="width: 100%; text-align: left;">
        <thead>
            <tr>
              <th>ISBN</th>
              <th>Título</th>
              <th>Fecha Edición</th>
              <th>Número de Páginas</th>
              <th>Ejemplares</th>
              <th>Disponibles</th>
              <th>Sinopsis</th>
              <th>Presentación</th>
              <th>Literatura</th>
              <th>Autor</th>
              <th>Fecha Publicación Autor</th>
              <th>Premios</th>
              <th>Fecha de Fallecimiento</th>
            </tr>
        </thead>
          <tr>
            <td>${book.Isbn}</td>
            <td>${book.Titulo}</td>
            <td>${book.fechEdicion}</td>
            <td>${book.numPaginas}</td>
            <td>${book.cantEjemplares}</td>
            <td>${book.cantEjemplaresDisponibles}</td>
            <td>${book.Sinopsis}</td>
            <td>${book.tipoPresentacion}</td>
            <td>${book.tipoLiteratura}</td>
            <td>${book.Autor.Nombre} ${book.Autor.Apellidos}</td>
            <td>${book.Autor.fechPub}</td>
            <td>${premios}</td>
            <td>${book.Autor.fecFall}</td>
          </tr>
        </table>
      `;
    }
    function generateAuthorsTable(autores) {
      let table = `
        <table border="1" style="width: 100%; text-align: left;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Premios</th>
              <th>Fecha de fallecimiento</th>
            </tr>
          </thead>
          <tbody>
      `;

      autores.forEach(autor => {
        const premios = autor.Premios.join(", ");
        table += `
          <tr>
            <td>${autor.Nombre}</td>
            <td>${autor.Apellidos}</td>
            <td>${premios}</td>
            <td>${autor.fecFall}</td>
          </tr>
        `;
      });

      table += `
          </tbody>
        </table>
      `;
      return table;
    }

    function generateAuthorTable(autor) {
      const premios = autor.Premios.join(", ");
      return `
        <table border="1" style="width: 100%; text-align: left;">
        <thead>
            <tr>
              <th>Autor</th>
              <th>Premios</th>
              <th>Fecha de Fallecimiento</th>
            </tr>
        </thead>
          <tr>
            <td>${autor.Nombre} ${autor.Apellidos}</td>
            <td>${premios}</td>
            <td>${autor.fecFall}</td>
          </tr>
        </table>
      `;
    }
    
    document.getElementById('loadBooks').addEventListener('click', async () => {
      try {
        const response = await fetch(`${backendUrl}/api/getLibros`);
        const books = await response.json(); // Parsear JSON de la respuesta
        const html = generateBooksTable(books); // Generar tabla
        document.getElementById('outputlibros').innerHTML = html;
      } catch (error) {
        document.getElementById('outputlibros').innerHTML = `<p>Error cargando libros: ${error.message}</p>`;
      }
    });

    document.getElementById('loadBook').addEventListener('click', async () => {
      const bookId = document.getElementById('bookId').value;
      try {
        const response = await fetch(`${backendUrl}/api/getLibro/${bookId}`);
        const book = await response.json(); // Parsear JSON de la respuesta
        const html = generateBooksTable([book]); // Generar tabla con un solo libro
        document.getElementById('outputlibros').innerHTML = html;
      } catch (error) {
        document.getElementById('outputlibros').innerHTML = `<p>Error cargando libro: ${error.message}</p>`;
      }
    });

    //---------------------------------------------
    // Buscar libro
    /*document.getElementById('loadBook').addEventListener('click', async (event) => {
      event.preventDefault();

      const isbn = document.getElementById('bookId').value;

      try {
        const response = await fetch(`${backendUrl}/api/getLibro`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Isbn: isbn })
        });

        if (!response.ok) throw new Error("Error al obtener el libro");
        const data = await response.json();

        document.getElementById('outputlibros').innerHTML = generateBooksTable([data]);
      } catch (error) {
        document.getElementById('outputlibros').innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });*/

    //---------------------------------------------
    // Buscar Autor
    document.getElementById('loadAuthor').addEventListener('click', async () => {
      // Capturar los valores del formulario
      const autor = {
        Nombre: document.getElementById('authorNombre').value,
        Apellidos: document.getElementById('authorApellido').value,
      };
    
      try {
        // Enviar una solicitud POST para buscar el autor
        const response = await fetch(`${backendUrl}/api/getAutor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicamos que enviamos JSON
            },
            body: JSON.stringify(autor), // Convertimos el objeto en JSON
        });

        if (!response.ok) {
            throw new Error(`Error al buscar el autor: ${response.statusText}`);
        }

        const data = await response.json();
        html=generateAuthorTable(data);
        document.getElementById('output').innerHTML = html;
        /*document.getElementById('output').innerHTML = `
            <p>Autor encontrado:</p>
            <ul>
                <li><b>Nombre:</b> ${data.Nombre}</li>
                <li><b>Apellidos:</b> ${data.Apellidos}</li>
                <li><b>Premios:</b> ${data.Premios.join(', ')}</li>
                <li><b>Fecha de Fallecimiento:</b> ${data.fecFall || 'N/A'}</li>
            </ul>`;*/
    } catch (error) {
        document.getElementById('output').innerHTML = `<p>Error buscando el autor: ${error.message}</p>`;
    }
    });
    //---------------------------------------------
    // Eliminar libro
    document.getElementById('DeleteBook').addEventListener('click', async () => {
        const bookId = document.getElementById('bookId').value;
        try {
          const response = await fetch(`${backendUrl}/api/DeleteBook/${bookId}`);
          const book = await response.json(); // Parsear JSON de la respuesta
          const html = generateBooksTable([book]); // Generar tabla con un solo libro
          document.getElementById('outputlibros').innerHTML = html;
        } catch (error) {
          document.getElementById('outputlibros').innerHTML = `<p>Error eliminando libro: ${error.message}</p>`;
        }
      });
    //---------------------------------------------
    // Buscar autores  
    document.getElementById('loadAuthors').addEventListener('click', async () => {
      try {
        const response = await fetch(`${backendUrl}/api/getAutores`);
        const autores = await response.json();
        const html = generateAuthorsTable(autores); // Generar tabla
        document.getElementById('output').innerHTML = html;
      } catch (error) {
        document.getElementById('output').innerHTML = `<p>Error cargando autores: ${error.message}</p>`;
      }
    });
    //---------------------------------------------
    //Añadir libro
    document.getElementById('addBook').addEventListener('submit', async (event) => {
        event.preventDefault();
      
        const libro = {
          Isbn: document.getElementById('isbn').value,
          Titulo: document.getElementById('titulo').value,
          fechEdicion: document.getElementById('fechEdicion').value,
          numPaginas: parseInt(document.getElementById('numPaginas').value, 10),
          cantEjemplares: parseInt(document.getElementById('cantEjemplares').value, 10),
          cantEjemplaresDisponibles: parseInt(document.getElementById('cantEjemplaresDisponibles').value, 10),
          Sinopsis: document.getElementById('sinopsis').value,
          tipoPresentacion: document.getElementById('tipoPresentacion').value,
          tipoLiteratura: document.getElementById('tipoLiteratura').value,
          Autor: {
              Nombre: document.getElementById('autorNombre').value,
              Apellidos: document.getElementById('autorApellidos').value,
              fechPub: document.getElementById('autorFechPub').value,
              Premios: document.getElementById('premios').value.split(','),
              fecFall: document.getElementById('autorFecFall').value,
          },
      };
      
      try {
        const response = await fetch(`${backendUrl}/api/AddBook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(libro),
        });
        const data = await response.json();
        document.getElementById('outputlibros').innerHTML = generateBookTable(data);
    } catch (error) {
        document.getElementById('outputlibros').innerHTML = `<p>Error añadiendo el libro: ${error.message}</p>`;
    }
      });
      //---------------------------------------------
    //Añadir autor

    document.getElementById('addAuthor').addEventListener('submit', async (event) => {
      event.preventDefault();

      // Función para generar un ISBN aleatorio
      const generarIsbn = () => {
        const prefijo = "978"; // Prefijo estándar para ISBN
        const grupo = Math.floor(Math.random() * 10); // Número de grupo aleatorio (0-9)
        const editor = Math.floor(1000 + Math.random() * 9000); // Número de editor aleatorio (4 dígitos)
        const titulo = Math.floor(10000 + Math.random() * 90000); // Identificador de título aleatorio (5 dígitos)
        const digitoControl = Math.floor(Math.random() * 10); // Dígito de control (0-9)

        return `${prefijo}-${grupo}-${editor}-${titulo}-${digitoControl}`;
    };

  // Generar un ISBN aleatorio
  const isbnAleatorio = generarIsbn();
      const libro = {
        Isbn: isbnAleatorio,
        Titulo: "NaN",
        fechEdicion: "NaN",
        numPaginas: 0,
        cantEjemplares: 0,
        cantEjemplaresDisponibles: 0,
        Sinopsis: "NaN",
        tipoPresentacion: "NaN",
        tipoLiteratura: "NaN",
        Autor: {
            Nombre: document.getElementById('autorNombre_2').value,
            Apellidos: document.getElementById('autorApellidos_2').value,
            fechPub: document.getElementById('autorFechPub_2').value,
            Premios: document.getElementById('premios_2').value.split(',').map(premio => premio.trim()), // Convierte en un array
            fecFall: document.getElementById('autorFecFall_2').value,
        },
    };

      try {
          // Hacer una solicitud POST al backend con los datos en el cuerpo de la solicitud
          const response = await fetch(`${backendUrl}/api/AddAuthor`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', // Indicamos que enviamos JSON
              },
              body: JSON.stringify(libro), // Convertimos el objeto en JSON
          });

          if (!response.ok) {
              throw new Error(`Error al añadir el autor: ${response.statusText}`);
          }

          const data = await response.json();
          document.getElementById('output').innerHTML = `<p>Autor añadido correctamente: ${data.Autor.Nombre} ${data.Autor.Apellidos}</p>`;
      } catch (error) {
          document.getElementById('output').innerHTML = `<p>Error añadiendo el autor: ${error.message}</p>`;
      }
    });
      //---------------------------------------------
      //eliminar autor
    document.getElementById('DeleteAuthor').addEventListener('click', async (event) => {
      event.preventDefault();
  
      // Capturar los valores del formulario
      const autor = {
          Nombre: document.getElementById('authorNombre').value,
          Apellidos: document.getElementById('authorApellido').value,
      };
  
      try {
          // Enviar una solicitud DELETE para eliminar el autor
          const response = await fetch(`${backendUrl}/api/DeleteAuthor`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json', // Indicamos que enviamos JSON
              },
              body: JSON.stringify(autor), // Convertimos el objeto en JSON
          });
  
          if (!response.ok) {
              throw new Error(`Error al eliminar el autor: ${response.statusText}`);
          }
  
          const data = await response.json();
          document.getElementById('output').innerHTML = `<p>Autor eliminado correctamente: ${data.Autor.Nombre} ${data.Autor.Apellidos}</p>`;
      } catch (error) {
          document.getElementById('output').innerHTML = `<p>Error eliminando el autor: ${error.message}</p>`;
      }
  });
  
    //---------------------------------------------
    //Modificar libro
    document.getElementById('modifyBook').addEventListener('click', async (event) => {
      event.preventDefault();
  
      // Capturar los valores del formulario
      const libro = {
          Isbn: document.getElementById('isbn').value,
          Titulo: document.getElementById('titulo').value,
          fechEdicion: document.getElementById('fechEdicion').value,
          numPaginas: parseInt(document.getElementById('numPaginas').value, 10),
          cantEjemplares: parseInt(document.getElementById('cantEjemplares').value, 10),
          cantEjemplaresDisponibles: parseInt(document.getElementById('cantEjemplaresDisponibles').value, 10),
          Sinopsis: document.getElementById('sinopsis').value,
          tipoPresentacion: document.getElementById('tipoPresentacion').value,
          tipoLiteratura: document.getElementById('tipoLiteratura').value,
          Autor: {
              Nombre: document.getElementById('autorNombre').value,
              Apellidos: document.getElementById('autorApellidos').value,
              fechPub: document.getElementById('autorFechPub').value,
              Premios: document.getElementById('premios').value.split(',').map(premio => premio.trim()),
              fecFall: document.getElementById('autorFecFall').value,
          },
      };
  
      try {
          const response = await fetch(`${backendUrl}/api/UpdateBook`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(libro), // Enviamos los datos como JSON
          });
  
          if (!response.ok) {
              throw new Error(`Error al modificar el libro: ${response.statusText}`);
          }
  
          const data = await response.json();
          document.getElementById('outputlibros').innerHTML = `<p>Libro modificado correctamente: ${data.Titulo}</p>`;
      } catch (error) {
          document.getElementById('outputlibros').innerHTML = `<p>Error modificando el libro: ${error.message}</p>`;
      }
  }); 
    //---------------------------------------------
    //Modificar autor
  document.getElementById('modifyAuthor').addEventListener('click', async (event) => {
    event.preventDefault();

    // Capturar los valores del formulario
    const autor = {
        Nombre: document.getElementById('autorNombre_2').value,
        Apellidos: document.getElementById('autorApellidos_2').value,
        fechPub: document.getElementById('autorFechPub_2').value,
        Premios: document.getElementById('premios_2').value.split(',').map(premio => premio.trim()),
        fecFall: document.getElementById('autorFecFall_2').value,
    };

    try {
        const response = await fetch(`${backendUrl}/api/UpdateAuthor`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(autor), // Enviamos los datos como JSON
        });

        if (!response.ok) {
            throw new Error(`Error al modificar el autor: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('output').innerHTML = `<p>Autor modificado correctamente: ${data.Nombre} ${data.Apellidos}</p>`;
    } catch (error) {
        document.getElementById('output').innerHTML = `<p>Error modificando el autor: ${error.message}</p>`;
    }
});


      document.addEventListener('DOMContentLoaded', () => {
        // Selección de botones y secciones
        const buttons = document.querySelectorAll('nav button');
        const sections = document.querySelectorAll('main > section');
      
        // Función para mostrar una sección y ocultar las demás
        const showSection = (sectionId) => {
          sections.forEach((section) => {
            if (section.id === sectionId) {
              section.style.display = 'block';
            } else {
              section.style.display = 'none';
            }
          });
        };
      
        // Agregar eventos a los botones del menú
        buttons.forEach((button) => {
          button.addEventListener('click', () => {
            const sectionId = button.id.toLowerCase(); // Los IDs coinciden con las secciones en minúsculas
            showSection(sectionId);
      
            // Actualizar la clase activa del botón
            buttons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
          });
        });
      
        // Mostrar la sección "home" por defecto al cargar la página
        showSection('home');
      });
      
      