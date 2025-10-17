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
export interface LoginResp {
	success: boolean;
	token?: string;
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