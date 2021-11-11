import './App.css';
import UserRoutes from './components/Routes';
import Navbar from './components/Navbar';

function App() {
	
	return (
		<div className="App">
			<Navbar />
			
			<UserRoutes/>
		</div>
	);
}

export default App;
