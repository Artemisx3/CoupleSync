import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Countdown from './countdown'; // Adjust the import path if necessary

function Hello() {
  return (
    <div>
      <h1 className="Hello container">CoupleSync</h1>
      <div className="list">
        <Link to="/show-time" className="time">
          1. Show time till we meet each other
        </Link>
        <Link to="/check-weather" className="weather">
          2. Check the weather for two cities.
        </Link>
        <Link to="/set-dates" className="cdates">
          3. Set custom target and end dates.
        </Link>
        <Link to="/view-credits" className="credits">
          4. View credits
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/show-time" element={<Countdown />} />
        {/* Add routes for other components as needed */}
      </Routes>
    </Router>
  );
}
