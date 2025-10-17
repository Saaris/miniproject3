export interface UserItem {
    pk: string;
    sk: string;
    username: string;
    password: string;
    accessLevel: string;
}
export interface MessageResp {
    message: string;
}
export interface SigninResp {
    success: boolean;
    token?: string;
    message: string;
}
export interface SigninBody {
    username: string;
    password: string;
}
export interface User {
    userId: string;
    username: string;
    password: string;
}
export interface Payload {
    username: string;
    expiration: number;
}
export interface UserBody {
    username: string;
    password: string;
}
export interface PostResponse {
    success: boolean;
    message: string;
    token?: string;
}
//# sourceMappingURL=types.d.ts.map