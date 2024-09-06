import { Link } from 'react-router-dom'; // Import Link correctly
import { parseDate } from '../../utils/parseDate'; // Ensure this path is correct
import React from 'react';

// Define your human-readable date strings
const TARGET_DATE_STR = '13/09/2024-22:10'; // Change this to your desired date
const END_DATE_STR = '27/09/2024-16:25'; // Change this to your desired end date

// Convert human-readable strings to Date objects
const TARGET_DATE = parseDate(TARGET_DATE_STR);
const END_DATE = parseDate(END_DATE_STR);

interface TimeLeft {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
}

function Countdown(): JSX.Element {
  const calculateTimeLeft = (): TimeLeft | string => {
    const now = new Date();
    const timeDifference = TARGET_DATE.getTime() - now.getTime();
    const endTimeDifference = END_DATE.getTime() - now.getTime();

    if (timeDifference <= 0 && endTimeDifference > 0) {
      return 'Enjoy your time together :3';
    }
    if (endTimeDifference <= 0) {
      return 'No more time together :(';
    }

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30); // Approximate months
    const remainingDays = days % 30; // Days remaining after accounting for months

    // If hours are 0, set minutes to the same value as hours
    const displayMinutes =
      hours === 0 ? minutes : Math.floor((timeDifference / (1000 * 60)) % 60);

    return {
      seconds,
      minutes: displayMinutes,
      hours,
      days: remainingDays,
      months,
    };
  };

  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | string>('Loading...');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      {typeof timeLeft === 'string' ? (
        <div>
          <h1>{timeLeft}</h1>
          {timeLeft === 'Enjoy your time together :3' && (
            <img className="pt-8 w-full" src="/happy.gif" alt="Happy GIF" />
          )}
          {timeLeft === 'No more time together :(' && (
            <img className="pt-8 w-full" src="/sad.gif" alt="Sad GIF" />
          )}
        </div>
      ) : (
        <div className="time-display">
          {timeLeft.months > 0 && (
            <h1>
              {timeLeft.months} Month{timeLeft.months > 1 ? 's' : ''}
            </h1>
          )}
          {timeLeft.days > 0 && (
            <h2>
              {timeLeft.days} Day{timeLeft.days > 1 ? 's' : ''}
            </h2>
          )}
          {timeLeft.hours > 0 && (
            <h3>
              {timeLeft.hours} Hour{timeLeft.hours > 1 ? 's' : ''}
            </h3>
          )}
          {timeLeft.minutes >= 0 && (
            <h4>
              {timeLeft.minutes} Minute{timeLeft.minutes > 1 ? 's' : ''}
            </h4>
          )}
          {timeLeft.seconds >= 0 && (
            <h5>
              {timeLeft.seconds} Second{timeLeft.seconds > 1 ? 's' : ''}
            </h5>
          )}
        </div>
      )}
      {/* Use Link component correctly */}
      <Link to="/" className="go-back-button">
        Go back
      </Link>
    </div>
  );
}

export default Countdown;