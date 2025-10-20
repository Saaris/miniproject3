import { useState } from 'react';


const App = () => {
    
	return (
		<>
		<header> <h1> Användarhantering </h1> </header>
		<main>

			<div className="box column">
				<p> Testa request </p>
				<button> Skicka HTTP request till server </button>

			</div>

			<div className="box">
				<p> Användare </p>
				<button> Visa alla användare </button>
				<ul className="list">
					<button> Ta bort användare </button>
				
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