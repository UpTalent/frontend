import React from 'react';
import './App.css';

const App = () => {
	return (
		<>
			<Header />
			<div className="appContainer">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default App;
