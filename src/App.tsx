import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import './App.css';
import RecipeCardComponent from './recipe_cards';
import CountryDetailComponent from './country-detail';
import CountryLandingPage from './youtube-specific-country-lp';


const Measurement_Id = 'G-463K0R483W';
ReactGA.initialize(Measurement_Id);

function App() {


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<RecipeCardComponent />} />
            <Route path="/country/:code" element={<CountryDetailComponent />} />
            <Route path="/specific-country-youtube/:code" element={<CountryLandingPage />} />
          </Routes>
        </header>
        <PageTracker />
      </div>
    </Router>
  );
}

// Separate component for tracking page views
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const reportPageView = (url: string) => {
      ReactGA.send({ hitType: 'pageview', page: url });
    };

    reportPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component does not render anything
};

export default App;
