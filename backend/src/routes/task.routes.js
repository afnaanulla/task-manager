// task.routes.js — Task CRUD routes (all protected)

const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { validateTask } = require("../middlewares/validation.middleware");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");


router.use(authMiddleware);

router.post("/", validateTask, createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
