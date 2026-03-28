const { Router } = require("express");
const { 
  createTask,
  listTaskByUser,
  updateTaskById,
  deleteTaskById
} = require("../controllers/task.controller");

const authMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, listTaskByUser);
router.put("/:id", authMiddleware, updateTaskById);
router.delete("/:id", authMiddleware, deleteTaskById);


module.exports = router;
