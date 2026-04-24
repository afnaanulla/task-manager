// task.controller.js — CRUD operations for tasks

const { Task } = require("../models");


exports.createTask = async (request, response, next) => {
  try {
    if (!request.body) {
      return response.status(400).json({ 
        message: "Request body is required" 
      });
    }
    
    const { title, body, status } = request.body;
    
    if (!title) {
      return response.status(400).json({ 
        message: "Title is required" 
      });
    }
    

    
    const task = await Task.create({
      title,
      body,
      status,
      userId,
    });
    
    response.status(201).json({ 
      message: "Task created successfully", 
      task 
    });
  } catch (error) {
    next(error);
  }
};


exports.getTasks = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const tasks = await Task.findAll({ where: { userId } });
    response.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};


exports.getTaskById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    

    const task = await Task.findOne({ 
      where: { id, userId } 
    });
    
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    
    response.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { title, body, status } = request.body;
    const userId = request.user.id;
    

    const task = await Task.findOne({ 
      where: { id, userId } 
    });
    
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    

    await task.update({ title, body, status });
    
    response.status(200).json({ 
      message: "Task updated successfully", 
      task 
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (request, response, next) => {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    

    const task = await Task.findOne({ 
      where: { id, userId } 
    });
    
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    
    await task.destroy();
    
    response.status(200).json({ 
      message: "Task deleted successfully" 
    });
  } catch (error) {
    next(error);
  }
};
