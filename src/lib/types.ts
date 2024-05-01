import { z } from 'zod'

export const signUpSchema = z
    .object({
        email: z.string().email('Email is required'),
        password: z.string().min(10, 'Password must be at least 10 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password must be at least 10 characters',
        path: ['confirmPassword'], // must show the field for error messages
    })

export type TSignUpSchema = z.infer<typeof signUpSchema>
