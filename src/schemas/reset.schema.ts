import { z } from 'zod';

export const resetSchema = z.object({
	newPassword: z
		.string()
        .min(8, 'Password must be a minimum of 8 characters'),
	confirmPassword: z
		.string()
		.min(8, 'Password must be a minimum of 8 characters')
}).refine((data) => data.newPassword === data.confirmPassword, {
    // This part executes only if the condition above evaluates to a falsy
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})
