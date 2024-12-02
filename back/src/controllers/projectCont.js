const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
    const { title, description, category } = req.body;

    try {
        const project = new Project({
            title,
            description,
            category,
            createdBy: req.user.id,
        });

        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("createdBy", "name email");
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get a project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            "createdBy",
            "name email"
        );

        if (!project) return res.status(404).json({ msg: "Project not found" });

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") return res.status(404).json({ msg: "Project not found" });
        res.status(500).send("Server Error");
    }
};

// Update a project
const updateProject = async (req, res) => {
    const { title, description, category } = req.body;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: "Project not found" });

        // Check if the logged-in user owns the project
        if (project.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, category } },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") return res.status(404).json({ msg: "Project not found" });
        res.status(500).send("Server Error");
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: "Project not found" });

        // Check if the logged-in user owns the project
        if (project.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await project.remove();
        res.json({ msg: "Project removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") return res.status(404).json({ msg: "Project not found" });
        res.status(500).send("Server Error");
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};

