import { User } from '../users/schemas/user.schema'; // Adjust the path to your actual User model

declare global {
    namespace Express {
        interface Request {
            user?: User; // Replace `User` with your actual type or `any` temporarily
        }
    }
}
