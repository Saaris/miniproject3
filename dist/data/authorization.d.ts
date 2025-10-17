interface Payload {
    userId: string;
    accessLevel: string;
}
declare function validate(authHeader: string | undefined): Payload | null;
declare function createToken(userId: string, accessLevel: string): string;
export { createToken, validate, type Payload };
//# sourceMappingURL=authorization.d.ts.map