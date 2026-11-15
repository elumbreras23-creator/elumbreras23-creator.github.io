
fetch("entradas.json")
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar entradas.json");
        }
        return respuesta.json();
    })
    .then(entradas => {
        const contenedor = document.getElementById("lista-publicaciones");

        contenedor.innerHTML = "";

        // Ordenamos las entradas de más reciente a más antigua
        entradas.sort((a, b) => b.fecha.localeCompare(a.fecha));

        entradas.forEach(entrada => {
            const articulo = document.createElement("article");
            const titulo = document.createElement("h3");
            const fecha = document.createElement("p");
            const descripcion = document.createElement("p");
            const enlace = document.createElement("a");

            titulo.textContent = entrada.titulo;
            fecha.textContent = entrada.fecha;
            descripcion.textContent = entrada.descripcion;
            enlace.textContent = "Leer publicación";
            enlace.href = entrada.url;

            articulo.append(titulo, fecha, descripcion, enlace);
            contenedor.appendChild(articulo);
        });
    })
    .catch(error => {
        console.error("Error cargando publicaciones:", error);
        document.getElementById("lista-publicaciones").textContent =
            "No se pudieron cargar las publicaciones.";
    });
