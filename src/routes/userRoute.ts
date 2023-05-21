import express from 'express';
import { TestUser } from '../controllers/userController';

const router = express.Router();

router.route('/test').get(TestUser);

export default router;
