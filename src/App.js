import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [timeRemain, setTimeRemain] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (countdown !== null) {
      const timer = setInterval(() => {
        const present = new Date().getTime();
        const distance = countdown - present;
        if (distance <= 0) {
          clearInterval(timer);
          setCountdown(null);
          setTimeRemain({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeRemain({ days, hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleStart = () => {
    const selectedDate = new Date(targetDate).getTime();
    const now = new Date().getTime();
    if (selectedDate <= now) {
      alert('Please select a future date and time.');
    } else {
      setCountdown(selectedDate);
    }
  };

  const handleCancel = () => {
    clearInterval(countdown);
    setCountdown(null);
    setTimeRemain({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  const handleChange = (e) => {
    setTargetDate(e.target.value);
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div>
        <label htmlFor="targetDate">Select Date and Time:</label>
        <input
          type="datetime-local"
          id="targetDate"
          value={targetDate}
          onChange={handleChange}
        />
        <button onClick={handleStart}>Start Timer</button>
        <button onClick={handleCancel}>Cancel Timer</button>
      </div>
      {countdown !== null && (
        <div className="countdown">
          <h2>Time Remaining:</h2>
          <p>{timeRemain.days} Days</p>         
          <p>{timeRemain.hours} Hours</p>
          <p>{timeRemain.minutes} Minutes</p>
          <p>{timeRemain.seconds} Seconds</p>
        </div>
      )}
    </div>
  );
}

export default App;
