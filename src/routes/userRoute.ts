import express from 'express';
import { TestUser } from '../controllers/userController';

const router = express.Router();

router.route('/test').post(TestUser);

export default router;
