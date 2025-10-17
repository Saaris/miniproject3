import jwt from 'jsonwebtoken';
const jwtSecret = process.env.MY_JWT_SECRET || '';
function validate(authHeader) {
    // 'Bearer: token'
    if (!authHeader) {
        return null;
    }
    const token = authHeader.substring(8);
    try {
        const decodedPayload = jwt.verify(token, jwtSecret);
        const payload = { userId: decodedPayload.userId, accessLevel: decodedPayload.accessLevel };
        return payload;
    }
    catch (error) {
        console.log('JWT verify failed: ', error?.message);
        return null;
    }
}
function createToken(userId, accessLevel) {
    if (!jwtSecret) {
        throw new Error('JWT secret is not configured. Check MY_JWT_SECRET in .env file');
    }
    const now = Math.floor(Date.now() / 1000);
    const defaultExpiration = now + 15 * 60;
    return jwt.sign({
        userId: userId,
        accessLevel: accessLevel,
        exp: defaultExpiration
    }, jwtSecret);
}
export { createToken, validate };
//# sourceMappingURL=authorization.js.map