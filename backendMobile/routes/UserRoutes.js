import {Router} from 'express'; 

import UserController from '../controllers/UserController.js';



const router = new Router();

router.post('/registro', UserController.registro);
router.post('/login', UserController.login);


export default router;