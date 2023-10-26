const express = require('express');
const projectRouter = express.Router();
const Project = require('../models/projectModel');


projectRouter.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching projects.' });

    }
});

projectRouter.post('/projects', async (req, res) => {
    try {
        const projectTitle = req.body.title;

        const existingProject = await Project.findOne({ title: projectTitle });

        if (existingProject) {
            return res.status(400).json({ error: `Project with the title '${projectTitle}' already exists` });
        }

        const newProject = new Project(req.body);
        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.log('err', error);
        res.status(500).json({ error: 'An error occurred while creating a project.' });
    }
});

projectRouter.get('/projects/:id', getProject, async (req, res) => {
    const project = await Project.findOne({ _id: req.params.id });
    res.json(res.project)
})


projectRouter.put('/projects/:id', getProject, async (req, res) => {
    try {
        const existingProject = await Project.findOne({ _id: req.params.id });

        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (req.body.title) {
            if (req.body.title !== existingProject.title) {
                const projectWithSameTitle = await Project.findOne({ title: req.body.title });
                if (projectWithSameTitle) {
                    return res.status(400).json({ message: `Project with the title '${req.body.title}' already exists` });
                }
            }
            existingProject.title = req.body.title;
        }

        if (req.body.description != null) {
            existingProject.description = req.body.description;
        }
        if (req.body.subProjects != null) {
            existingProject.subProjects = req.body.subProjects;
        }

        const updatedProject = await existingProject.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


projectRouter.delete('/projects/:id', getProject, async (req, res) => {
    try {
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getProject(req, res, next) {
    try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.project = project;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports = projectRouter;


