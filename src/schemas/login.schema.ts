import { z } from 'zod';

export const loginSchema = z.object({
    identity: z
        .string()
        .trim()
        .min(1, 'Please enter your username or email')
        .max(30, 'Identity details are too long'),
    password: z
        .string()
        .min(1, 'Please enter your password')
});

export type LoginInput = z.infer<typeof loginSchema>;
