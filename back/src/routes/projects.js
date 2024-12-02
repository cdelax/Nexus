const express = require("express");
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/projectCont");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a project
router.post("/", auth, createProject);

// Get all projects
router.get("/", getAllProjects);

// Get a project by ID
router.get("/:id", getProjectById);

// Update a project
router.put("/:id", auth, updateProject);

// Delete a project
router.delete("/:id", auth, deleteProject);

module.exports = router;

