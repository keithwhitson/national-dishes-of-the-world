import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import ReactGA from 'react-ga4';
import './App.css';
import RecipeCardComponent from './recipe_cards';
import CountryDetailComponent from './country-detail';
import CountryLandingPage from './youtube-specific-country-lp';
import { Helmet } from 'react-helmet';

const Measurement_Id = 'G-463K0R483W';
ReactGA.initialize(Measurement_Id);

function App() {
  return (
    <Router>
      <Helmet>
        <meta
          name="impact-site-verification"
          content="39d5ed83-9eb9-4e24-a36f-9775c466b4f4"
        />
      </Helmet>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<RecipeCardComponent />} />
            <Route path="/country/:code" element={<CountryDetailComponent />} />
            <Route
              path="/specific-country-youtube/:code"
              element={<CountryLandingPage />}
            />
          </Routes>
        </header>
        <div>
          Impact-Site-Verification: 39d5ed83-9eb9-4e24-a36f-9775c466b4f4
        </div>
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
