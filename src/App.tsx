import React from 'react';
import ReactGA from 'react-ga4'
import './App.css';
import RecipeCardComponent from './recipe_cards'

const Measurement_Id = 'G-463K0R483W';
ReactGA.initialize(Measurement_Id);



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecipeCardComponent/>
      </header>
    </div>
  );
}

export default App;
