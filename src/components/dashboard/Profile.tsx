import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import bssmn from '../../assets/bssman.svg';

interface DecodedToken {
  email: string;
  // Add other properties if needed
}

export default function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [remainingWeekdays, setRemainingWeekdays] = useState(0);
  const [remainingWeekends, setRemainingWeekends] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('');

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if token is not found
    } else {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUserName(decodedToken.email); // Set the user's name from the token
      setCurrentDate(getCurrentDate()); // Set the current date
      setCurrentMonth(getCurrentMonth()); // Set the current month
      setTimeOfDay(getTimeOfDay()); 
      const { weekdays, weekends } = calculateRemainingDays();
      setRemainingWeekdays(weekdays);
      setRemainingWeekends(weekends);
    }
  }, [navigate]);

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const getCurrentMonth = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const calculateRemainingDays = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let weekdays = 0;
    let weekends = 0;

    for (let day = today.getDate(); day <= endOfMonth.getDate(); day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        weekdays++;
      }
    }

    return { weekdays, weekends };
  };
  const getTimeOfDay = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 6) {
      return 'Midnight';
    } else if (hour >= 6 && hour < 12) {
      return 'Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  };
  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if token is not found
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page
  };
  return (
    <div className="container  w-full">
      <div className="bg-gray-900 rounded-lg flex justify-between items-start p-2">
        {/* Left Section - Profile Image */}
        <div className=" flex items-start">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img
              src={bssmn}
              alt="Profile"
              className="rounded-full object-cover w-20"
            />
          </div>
          
        </div>

        {/* Right Section - Details */}
        <div className=" flex justify-between items-center gap-5">
          <p className="text-xl font-semibold text-white">Good {timeOfDay},</p>
          <h1 className="text-xl font-bold text-white">{userName}</h1>
          <p className="text-sm text-gray-500">{currentDate}</p>
        <p className="text-red-600" onClick={handleLogout}>Logout</p>

          
        </div>
      </div>
    </div>
  );
}
