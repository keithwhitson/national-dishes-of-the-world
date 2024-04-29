import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4'
import './App.css';
import RecipeCardComponent from './recipe_cards'
import CountryDetailComponent from './country-detail'
import logo from './images/logo.jpg'


const Measurement_Id = 'G-463K0R483W';
ReactGA.initialize(Measurement_Id);



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <img src={logo} alt="Logo" className="logo"/>
          <Routes>
            <Route path="/" element ={<RecipeCardComponent/>} />
            <Route path="/country/:code" element={<CountryDetailComponent />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
