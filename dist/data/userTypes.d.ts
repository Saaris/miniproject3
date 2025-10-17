export interface User {
    pk: string;
    sk: string;
    username: string;
    meta: {
        email?: string;
        passwordHash: string;
        accessLevel: 'user' | 'admin';
        createdAt: string;
    };
}
export interface UserIdParam {
    id: string;
}
export interface UserRes {
    success: boolean;
    user: {
        id: string;
        username: string;
        email?: string;
        accessLevel: string;
        createdAt: string;
    };
}
export interface ErrorMessage {
    success: boolean;
    message: string;
}
export interface GetUsersRes {
    users: User[];
}
export interface UpdateUserRequest {
    username?: string;
    password?: string;
    email?: string;
}
//# sourceMappingURL=userTypes.d.ts.map