import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import HostDashBoard from './pages/DashBoardHost';
import AdminDashBoard from './pages/DashBoardAdmin';


export default function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/renters-dashboard" element={<DashBoard />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />

          <Route path="/host-dashboard" element={<HostDashBoard />} />

        </Routes>
    </Router>
  );
}
