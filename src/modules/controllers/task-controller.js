const TaskService = require('../services/task-service');
const ApiError = require('../exceptions/api-error');

class TaskController {
  getAllTasks = async (req, res, next) => {
    try { 
      const tasks = await TaskService.getAllTasks();

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  };
  
  createNewTask = async (req, res, next) => {
    try { 
      const task = req.body;
      const newTask = await TaskService.createNewTask(task);
      
      return res.json(newTask);
    } catch (error) {
      next(error);
    }
  };
  
  changeTaskCheckBox = async (req, res, next) => {
    try {
      const params = req.params;
      const _id = params._id; 
      const isCheck = req.body.isCheck;
  
      if ((!params.hasOwnProperty('_id'))
        || (_id === '')
        || (typeof isCheck !== 'boolean')
      ) {
        throw new ApiError('id or checkbox are unreachable to read');
      }
  
      const taskChanged = await TaskService.changeTaskCheckBox(_id, isCheck);
      return res.json(taskChanged);
    } catch (error) {
      next(error);
    }
  }
  
  editTaskInfo = async (req, res, next) => {
    try {
      const params = req.params;
      const _id = params._id;
      const task = req.body;
      const { title, text } = task;
  
      if ((!params.hasOwnProperty('_id'))
        || (_id === '') 
        || (text === '')
      ) {
        throw new ApiError('id or text are unreachable to read');
      }
  
      const taskChanged = await TaskService.editTaskInfo(task);
      return res.json(taskChanged);
    } catch (error) {
      next(error);
    }
  };
  
  deleteTask = async (req, res, next) => {
    try {
      const params = req.params;
      if (!params.hasOwnProperty('_id') || params._id === '') {
        throw new ApiError('id is unreachable to read');
      }
  
      const _id = params._id;
  
      const deletedTask = TaskService.deleteTask(_id);
      return res.json(deletedTask);
    } catch (error) {
      next(error);
    }
  };
}


module.exports = new TaskController();