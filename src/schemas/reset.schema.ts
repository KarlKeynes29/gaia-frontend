import { z } from 'zod';

export const resetSchema = z.object({
<<<<<<< Updated upstream
	newPassword: z
		.string()
        .min(8, 'Password must be a minimum of 8 characters'),
	confirmPassword: z
		.string()
		.min(8, 'Password must be a minimum of 8 characters')
		
});
=======
    password: z
        .string()
        .min(8, 'New password must be')
})
>>>>>>> Stashed changes
