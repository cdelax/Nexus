document.getElementById("publish-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !description) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            alert("Proyecto publicado con éxito.");
            window.location.href = "explore.html";
        } else {
            alert("Error al publicar el proyecto.");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
    }
});

