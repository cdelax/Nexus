async function deleteProject(id) {
    try {
        const response = await fetch(`https://api.tuapp.com/projects/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Proyecto eliminado");
            fetchProjects(); 
        }
    } catch (error) {
        console.error("Error al borrar el proyecto:", error);
    }
}

function editProject(id) {
    window.location.href = `post.html?id=${id}`; 
}

