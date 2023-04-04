import { Router } from 'express'

import TaskController from '../controllers/TaskController.js'
import verificatoken from "../helpers/verifica-token.js";
const router = new Router();

router.post('/', verificatoken,TaskController.create);
router.get('/:maxDate', TaskController.getTasks);
router.delete('/:id', verificatoken,TaskController.delete);
router.put('/:id',verificatoken, TaskController.updateTaskDoneAt);

export default router;
