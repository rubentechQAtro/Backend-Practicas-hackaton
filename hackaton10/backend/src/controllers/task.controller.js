const { Task } = require("../models/Task");


const createTask = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;

    console.log("req.usuario:", req.usuario.id);

    const task = await Task.create({
      title,
      description,
      deadline,
      userId: req.usuario.id,
    });

    return res.status(201).json({ status: "ok", data: task });
  } catch (error) {
    next(error);
  }
};


const listTaskByUser = async (req, res, next) => {
  try {
    const { status } = req.query;

    let where = { userId: req.usuario.id };

    if (status === "pending") {
      where.completed = false;
    } else if (status === "completed") {
      where.completed = true;
    }

    const tasks = await Task.findAll({ where });

    return res.json({ status: "ok", data: tasks });
  } catch (error) {
    next(error);
  }
};


const updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.update(req.body);

    return res.json({ status: "ok", data: task });
  } catch (error) {
    next(error);
  }
};


const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();

    return res.json({ status: "ok", message: "Tarea eliminada" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createTask,
  listTaskByUser,
  updateTaskById,
  deleteTaskById,
};