import { validate } from './authorization.js';
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const payload = validate(authHeader);
    if (!payload) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    req.user = payload;
    next();
};
export const tableName = 'jwt';
//# sourceMappingURL=middleware.js.map