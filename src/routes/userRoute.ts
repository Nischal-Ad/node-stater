import express from 'express';

//controllers
import { TestUser } from '../controllers/userController';

const router = express.Router();

router.route('/test').get(TestUser);

export default router;
