import * as z from 'zod'

export const userSchema = z.object ({
	pk: z.literal('user'),    
	sk: z.string().regex(/^user#\d+$/).transform(val => val as `user#${string}`), 
	username: z.string().min(1).max(50),    
})