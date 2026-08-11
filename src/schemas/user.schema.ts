import { z } from 'zod';
// NOTES:
// The way zod methods are declared, they have an ideal order of what to declare first before the other.
// (inner to outer)
// Base type and modifiers first = 'z.string().trim().max(50)'
// Pipelines and refinements next = '.pipe(...) or .refine(...)'
// Then lastly, nullability and optionality = '.nullable().optional()'.
export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, 'Please enter your first name')
        .max(50, 'First name is too long'),
    middleName: z
        .string()
        .trim()
        .max(50, 'Middle name is too long')
        .optional()
        .or(z.literal('')),
    lastName: z
        .string()
        .trim()
        .min(1, 'Please enter your last name'),
    username: z
        .string()
        .trim()
        .min(3, 'Must be at least 3 characters')
        .max(20, 'Username is too long')
        .regex(
	        /^[a-zA-Z0-9_-]+$/,
	        'Username can only contain letters, numbers, underscores, and hyphens'
        ),
    password: z
        .string()
        .min(8, 'Password must be a minimum of 8 characters'),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: 'Please enter a valid email address' })),
    birthday: z
        .coerce.date({ message: 'Please enter a valid date' })
        .nullable()
        .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
