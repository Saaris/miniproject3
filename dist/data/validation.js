import * as z from 'zod';
export const userSchema = z.object({
    pk: z.literal('user'),
    sk: z.string().regex(/^user#\d+$/).transform(val => val),
    username: z.string().min(1).max(50),
});
//# sourceMappingURL=validation.js.map