const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To read from .env
const authRouter = require('./routes/auth');  // Import auth routes
const protect = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Hire-Me-Please')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Basic route
app.get('/', (req, res) => {
  res.send('Help');
});

// Authentication routes
app.use('/auth', authRouter);  // Register the /auth route for authentication

// Job Listing route (fetch jobs from the database or return static data for now)
app.get('/jobs', async (req, res) => {
  try {
    const jobListings = [
      {
        title: "Software Engineer",
        company: "TechCorp",
        description: "Join our team to develop cutting-edge software solutions."
      },
      {
        title: "Web Developer",
        company: "WebWorks",
        description: "Build dynamic and responsive web applications with us."
      },
      {
        title: "Data Scientist",
        company: "DataX",
        description: "Analyze data to help drive strategic decision-making."
      }
    ];

    res.json(jobListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Profile route (protected by JWT middleware)
app.get('/profile', (req, res) => {
  // This route should be protected by JWT to allow only logged-in users to access it.
  res.json({ message: "User profile data here" });
});

// Job schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  company: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

// Add a new job
app.post('/jobs', (req, res) => {
  const { title, description, location, company } = req.body;
  
  const newJob = new Job({ title, description, location, company });
  
  newJob.save()
    .then(job => res.status(201).json(job))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
