import authService from "../services/auth-service";
import router from "./user-routes";
import userService from "../services/user-service";

router.post('/login', async (request, response) => {
    try {
        const result = await authService.login(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/signup', async (request, response) => {
    try {
        const result = await userService.createUser(request.body);
        response.status(201).json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

export default router