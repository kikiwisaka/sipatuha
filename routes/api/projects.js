const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../../models/Project');
const validateProjectInput = require('../../validation/project');

// @route   POST api/project
// @desc    Create project
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const projectFields = {};
    projectFields.user = req.user.id;

    if (req.body.name) projectFields.name = req.body.name;
    if (req.body.description) projectFields.description = req.body.description;
    if (req.body.owner) projectFields.owner = req.body.owner;
    if (typeof req.body.technology !== 'undefined') {
        projectFields.technology = req.body.technology.split(',');
    }

    Project.findOne({ user: req.user.id })
        .then(project => {
            // if (project) {
            //     //Update
            //     Project.findOneAndUpdate(
            //         { name: req.body.name },
            //         { $set: projectFields },
            //         { new: true }
            //     ).then(project => res.json(project));
            // } 
            new Project(projectFields).save()
                .then(project => res.json(project));
        })
});

// @route   GET api/project
// @desc    Get project by userId
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {};

    Project.find({ user: req.user.id })
        .populate('user', ['name', 'avatar', 'email']) //Display user object
        .then(project => {
            const isEmpty = (typeof project === 'object' && Object.keys(project).length === 0);
            if (isEmpty) {
                errors.noproject = 'There is no project for this user';
                return res.status(404).json(errors);
            }
            res.json(project);
        })
        .catch(err => res.status(404).json(err));
});

// @route   PUT api/project/id
// @desc    Get project by Id
// @access  Private
router.get('/:projectId', passport.authenticate('jwt', { session: false }), (req, res) => {
    let errors = {};
    console.log(req.params.projectId);
    const projectId = req.params.projectId;
    Project.findOne({ _id: projectId })
        .then(project => {
            console.log(project);
            if (!project) {
                errors.noproject = 'Project not found';
                return res.status(404).json(errors);
            }
            res.json(project);
        })
        .catch(err => res.status(404).err);
});

module.exports = router;