import {verifyJwt} from '../middleware/auth';
import express from 'express';
import userService from '../services/user-service';
const router = express.Router();

//AUTH PROTECTED
router.get('/me', verifyJwt,  async (request, response) => {
    try {
        const result = await userService.getUser(request.user);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

//AUTH PROTECTED
router.post('/me/update-password', verifyJwt,  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.get('/most-liked',  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.get('/:userId', async (request, response) => {
    try {
        const result = await userService.getUser({id: request.params.userId});
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

//AUTH PROTECTED
router.post('/:userId/like', verifyJwt, async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

//AUTH PROTECTED
router.post('/:userId/unlike', verifyJwt,  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});


export default router;