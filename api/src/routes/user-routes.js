import express from 'express';
import userService from '../services/user-service';
const router = express.Router();

router.get('/me',  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/me/update-password',  async (request, response) => {
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

router.get('/:userId',  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/:userId/like',  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/:userId/unlike',  async (request, response) => {
    try {
        const result = await userService.changePassword(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});


export default router;