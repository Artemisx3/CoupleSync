import "./App.css";
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
  import  Countdown from "./web/countdown";
  import CheckWeather from "./web/check-weather";
  // import SetDates from "./web/set-dates";
  import ViewCredits from "./web/view-credits";

function App() {
// put funconality here main.ts (basically)

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
  
  export default function routes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/show-time" element={<Countdown />} />
          <Route path="/check-weather" element={<CheckWeather />} />
          {/* <Route path="/set-dates" element={<SetDates />} /> */}
          <Route path="/view-credits" element={<ViewCredits />} />
          {/* Add routes for other components as needed */}
        </Routes>
      </Router>
    );
  }
