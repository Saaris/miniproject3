import jwt from 'jsonwebtoken'


const jwtSecret: string = process.env.MY_SECRET_JWT || ''

interface Payload  {
	userId: string;
	accessLevel: string;
}

function validate(authHeader: string | undefined): Payload | null {
	// 'Bearer: token'
	if( !authHeader ) {
		return null
	}
	const token: string = authHeader.substring(8) 
	try {
		const decodedPayload: Payload = jwt.verify(token, jwtSecret) as Payload
		
		const payload: Payload = { userId: decodedPayload.userId, accessLevel: decodedPayload.accessLevel }
		return payload

	} catch(error) {
		console.log('JWT verify failed: ', (error as any)?.message)
		return null
	}
}

function createToken(userId: string, accessLevel: string): string {
	const now = Math.floor(Date.now() / 1000)
	const defaultExpiration: number = now + 15 * 60 
	
	return jwt.sign({
		userId: userId,
		accessLevel: accessLevel,
		exp: defaultExpiration
	}, jwtSecret)
}

export { createToken, validate, type Payload }