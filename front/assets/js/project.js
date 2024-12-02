// Cargar detalles del proyecto dinámicamente
async function loadProjectDetails() {
    // Obtener el ID del proyecto desde los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    if (!projectId) {
        alert("No se encontró el ID del proyecto");
        window.location.href = "explore.html";
        return;
    }

    try {
        // Realizar la solicitud a la API
        const response = await fetch(`https://api.tuapp.com/projects/${projectId}`);
        
        if (!response.ok) {
            throw new Error("Error al cargar los datos del proyecto");
        }

        const project = await response.json();

        // Insertar los datos en el HTML
        document.getElementById("project-title").textContent = project.title || "Título no disponible";
        document.getElementById("project-category").textContent = project.category || "Sin categoría";
        document.getElementById("project-status").textContent = project.status || "Desconocido";
        document.getElementById("project-description").textContent = project.description || "Descripción no disponible";

        const goalsContainer = document.getElementById("project-goals");
        goalsContainer.innerHTML = ""; // Limpiar contenido previo
        (project.goals || []).forEach(goal => {
            const li = document.createElement("li");
            li.textContent = goal;
            goalsContainer.appendChild(li);
        });

        const requirementsContainer = document.getElementById("project-requirements");
        requirementsContainer.innerHTML = ""; // Limpiar contenido previo
        (project.requirements || []).forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            requirementsContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar los detalles del proyecto:", error);
        alert("Ocurrió un error al cargar el proyecto.");
        window.location.href = "explore.html";
    }
}

// Ejecutar la función al cargar la página
window.onload = loadProjectDetails;

