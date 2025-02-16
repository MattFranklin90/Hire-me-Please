import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import JobListings from "./components/JobListings"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-listings" element={<JobListings />} />
      </Routes>
    </Router>
  );
}

export default App;
