import { useState } from 'react';
import type { UserRes } from './types.ts';


const App = () => {
    
	const [users, setUsers] = useState<UserRes[]>([])
	const [pingResponse, setPingResponse] = useState<string>('')

	const handleClick = async () => {
		try {
			const response = await fetch('/api/ping')
			
			if (!response.ok) {
				console.error('Ping failed:', response.status)
				setPingResponse('❌ Ping failed!')
				return
			}
			
			const data = await response.json()
			console.log('Ping response:', data)
			setPingResponse(`✅ ${data.message}`)
		} catch (error) {
			console.error('Error pinging server:', error)
			setPingResponse('❌ Connection failed!')
		}
	}

	const handleGetUsers = async () => {
		try {
			// Använd test endpoint istället för autentiserad endpoint
			const response: Response = await fetch('/api/test-users')
			
			if (!response.ok) {
				console.error('Error fetching users:', response.status)
				return
			}
			
			const data = await response.json()
			console.log('Data from server:', data)
			
			// Om data är ett objekt med users property
			if (data && data.users && Array.isArray(data.users)) {
				setUsers(data.users)
			} 
			// Om data redan är en array
			else if (Array.isArray(data)) {
				setUsers(data)
			} 
			// Fallback
			else {
				console.error('Unexpected data format:', data)
				setUsers([])
			}
		} catch (error) {
			console.error('Error fetching users:', error)
			setUsers([])
		}
	}

	return (
		<>
		<header> <h1> Användarhantering </h1> </header>
		<main>

			<div className="box column">
				<p> Testa request </p>
				<button onClick={handleClick}> Skicka HTTP request till server </button>
				{pingResponse && <p style={{marginTop: '1rem', fontWeight: 'bold'}}>{pingResponse}</p>}
			</div>

			<div className="box">
				<p> Användare </p>
				<button onClick={handleGetUsers}> Visa alla användare </button>
				<ul className="list">
					{users.map(u => (
						<li key={u.userId} className="row">
							<div className="grow"> {u.username} </div>
					<button> Ta bort användare </button>
				
				</li>
					))}
				</ul>
			</div>

			<div className="box column">
				<h2> Registrera ny användare </h2>
				<label> Användarnamn </label>
				<input type="text" placeholder="användarnamn"
					
					/>

				<label> Lösenord </label>
				<input type="password" placeholder=""
					/>

				<button > Logga in </button>
				<button > Registrera </button>
			</div>

		</main>
		<footer> </footer>
		</>
	)
}

export default App;