import Task from "../models/task";
import { getPagination } from "../libs/getPagination";

export const findAll = async (req, res) => {
  const { size, page, title } = req.query;
  const { limit, offset } = getPagination(page, size);

  const condition = title
    ? {
        title: { $regex: new RegExp(title), $options: "i" },
      }
    : {};

  try {
    const tasks = await Task.paginate(condition, { offset, limit });
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something wrong in the server" });
  }
};

export const create = async (req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    return res.status(400).send({ message: "Wrong request" });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done || false,
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Something wrong in the server" });
  }
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: `Task with id ${id} does't exist` });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error loading task with id: ${id}`,
    });
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: `Task with id ${id} does't exist` });
    }
    await Task.findByIdAndDelete(id);
    res.json({ message: `Task deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Cannot delete Task with id: ${id}` });
  }
};

export const findAllDone = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    return res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error finding done tasks` });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: `Task with id ${id} does't exist` });
    }
    await Task.findByIdAndUpdate(id, req.body);
    res.json({ message: "Task was update Successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error updating done tasks` });
  }
};
