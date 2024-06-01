import express from 'express';
import db from '../models/index.js';  // Make sure the path is correct

const router = express.Router();
const { User } = db;

router.get('/create', async (req, res) => {
    try {
        const user = await User.create({
            firstName: "Hazim",
            age: 20
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
