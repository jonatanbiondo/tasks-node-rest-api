import { Router } from "express";

import * as TaskController from "../controllers/task.controller";
const router = Router();

router.post("/", TaskController.create);
router.put("/:id", TaskController.updateTask);
router.get("/", TaskController.findAll);
router.get("/done", TaskController.findAllDone);
router.get("/:id", TaskController.findOne);
router.delete("/:id", TaskController.deleteOne);

export default router;
