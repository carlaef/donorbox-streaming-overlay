import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/DonationWidget.jsx';

// Main Entry point function
function App() {
	return <Widget/>;
}

// Rendering the entire react application
ReactDOM.render(<App/>, document.getElementById('root'));
