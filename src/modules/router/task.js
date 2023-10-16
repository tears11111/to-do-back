const express = require('express');
const TaskController = require('../controllers/task-controller');
const router = express.Router();


router.get('/tasks', TaskController.getAllTasks);
router.post('/tasks',  TaskController.createNewTask);
router.patch('/tasks/:_id/checkbox',  TaskController.changeTaskCheckBox);
router.patch('/tasks/:_id',  TaskController.editTaskInfo);
router.delete('/tasks/:_id',  TaskController.deleteTask);

module.exports = router;