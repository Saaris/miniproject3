import * as z from 'zod';
export declare const userSchema: z.ZodObject<{
    pk: z.ZodLiteral<"user">;
    sk: z.ZodPipe<z.ZodString, z.ZodTransform<`user#${string}`, string>>;
    username: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map