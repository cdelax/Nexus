
async function fetchAndRenderProjects(searchQuery = "") {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();

        const cardsContainer = document.querySelector(".cards");
        cardsContainer.innerHTML = ""; // Limpia los elementos previos

        const filteredProjects = projects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filteredProjects.forEach(project => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>Categoría: ${project.category}</p>
                <p>Estado: ${project.status}</p>
                <button class="btn">
                    <a href="project.html?id=${project.id}" style="color: white;">Ver Más</a>
                </button>
            `;
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar los proyectos:", error);
    }
}

document.getElementById("search-bar").addEventListener("input", (e) => {
    fetchAndRenderProjects(e.target.value);
});

window.onload = () => fetchAndRenderProjects();

