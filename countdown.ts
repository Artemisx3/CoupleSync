import { parseDate } from './parseDate';

interface TimeLeft {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
}

const calculateTimeLeft = (targetDate: Date, endDate: Date): TimeLeft | string => {
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();
  const endTimeDifference = endDate.getTime() - now.getTime();

  if (timeDifference <= 0 && endTimeDifference > 0) {
    return 'Enjoy your time together :3';
  } else if (endTimeDifference <= 0) {
    return 'No more time together :(';
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30); // Approximate months
  const remainingDays = days % 30; // Days remaining after accounting for months

  // If hours are 0, set minutes to the same value as hours
  const displayMinutes = hours === 0 ? minutes : Math.floor((timeDifference / (1000 * 60)) % 60);

  return {
    seconds,
    minutes: displayMinutes,
    hours,
    days: remainingDays,
    months,
  };
};

const formatTimeLeft = (timeLeft: TimeLeft): string => {
  const { months, days, hours, minutes, seconds } = timeLeft;
  let result = '';

  if (months > 0) {
    result += `${months} month${months > 1 ? 's' : ''} `;
  }
  if (days > 0 || months > 0) {
    result += `${days} day${days > 1 ? 's' : ''} `;
  }
  result += `${hours} hour${hours > 1 ? 's' : ''} `;
  result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  result += `${seconds} second${seconds > 1 ? 's' : ''}`;

  return result.trim();
};

// Function to get the time left as a formatted string
const getTimeLeftString = (targetDateStr: string, endDateStr: string): string => {
  const targetDate = parseDate(targetDateStr);
  const endDate = parseDate(endDateStr);
  const timeLeft = calculateTimeLeft(targetDate, endDate);
  if (typeof timeLeft === 'string') {
    return timeLeft;
  } else {
    return formatTimeLeft(timeLeft);
  }
};

export default getTimeLeftString;
