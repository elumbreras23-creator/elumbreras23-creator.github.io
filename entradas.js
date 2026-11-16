
fetch("entradas.json")
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar entradas.json");
        }
        return respuesta.json();
    })
    .then(entradas => {
        const contenedor =
            document.getElementById("lista-publicaciones");

        contenedor.innerHTML = "";

        // Ordenar de más reciente a más antigua.
        entradas.sort((a, b) =>
            b.fecha.localeCompare(a.fecha)
        );

        let diaAnterior = "";

        entradas.forEach(entrada => {

            // La fecha ocupa los primeros 10 caracteres.
            const dia = entrada.fecha.substring(0, 10);
            const hora = entrada.fecha.includes("T")
                ? entrada.fecha.substring(11, 16)
                : "";

            // Crear una cabecera cuando cambie el día.
            if (dia !== diaAnterior) {
                const cabecera = document.createElement("h2");

                cabecera.textContent = new Date(
                    dia + "T12:00:00"
                ).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

                contenedor.appendChild(cabecera);
                diaAnterior = dia;
            }

            const articulo = document.createElement("article");
            const titulo = document.createElement("h3");
            const fecha = document.createElement("p");
            const descripcion = document.createElement("p");
            const enlace = document.createElement("a");

            titulo.textContent = entrada.titulo;
            fecha.textContent = hora
                ? "Publicado a las " + hora
                : "Hora no indicada";

            descripcion.textContent = entrada.descripcion;
            enlace.textContent = "Leer publicación";
            enlace.href = entrada.url;

            articulo.append(titulo, fecha, descripcion, enlace);
            contenedor.appendChild(articulo);
        });
    })
    .catch(error => {
        console.error("Error cargando publicaciones:", error);

        document.getElementById("lista-publicaciones")
            .textContent = "No se pudieron cargar las publicaciones.";
    });

