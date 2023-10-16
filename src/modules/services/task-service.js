const TaskModel = require('../../models/task');
const TaskDto = require('../dtos/task-dto');
const ApiError = require('../exceptions/api-error');

class TaskService {
  async getAllTasks() {
    const tasks = await TaskModel.find();
    if (!tasks) {
      throw new ApiError('Unavailable to get tasks');
    }

    return tasks;
  }

  async createNewTask(task) {
    if (task.title === '') {
      throw new ApiError('task title must not be empty');
    }

    const taskDto = new TaskDto(task);

    const newTask = await TaskModel.create(taskDto);
    if (!newTask) {
      throw new ApiError('Unavailable to add new task');
    }

    return newTask;
  }

  async changeTaskCheckBox(_id, isCheck) {
    if (!_id) {
      throw new ApiError('Unavailable to change checkbox');
    }

    const changedTask = TaskModel.findOneAndUpdate(
      { _id },
      { $set: { isCheck } },
      { returnDocument: 'after' }
    );

    if (!changedTask) {
      throw new ApiError('error');
    }

    return changedTask;
  }

  async editTaskInfo(task) {
    if (!task) {
      throw new ApiError('Unavailable to change task');
    }

    const { _id, title, text } = task;

    const changedTask = TaskModel.findOneAndUpdate(
      { _id },
      {
        $set: { 
          title,
          text
        }
      },
      { returnDocument: 'after' }
    )

    if (!changedTask) {
      throw new ApiError('error');
    }

    return changedTask;
  }

  async deleteTask(_id) {
    if (!_id) {
      throw new ApiError('Unavailable to get task id');
    }

    const task = TaskModel.findOneAndDelete({ _id });

    return task;
  }
}

module.exports = new TaskService();