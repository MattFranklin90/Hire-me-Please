import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"; // Import the LandingPage component
import JobListings from "./components/JobListings";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} /> {/* Default route */}
        
        {/* Job Listings Page */}
        <Route path="/jobs" element={<JobListings />} />
        
        {/* User Profile Page */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
