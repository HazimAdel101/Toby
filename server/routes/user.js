import { Router } from 'express';

const router = Router();
// logout 
router.get('/logout', (req, res) => {
    res.send('logout successfully')
} )

// auth with google
router.get('/google', (req, res) => {
    res.send('Hello, world!');
})

export default router;