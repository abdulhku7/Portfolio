const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Store submissions in a JSON file
const SUBMISSIONS_FILE = 'submissions.json';

// Initialize submissions file if it doesn't exist
async function initializeSubmissionsFile() {
    try {
        await fs.access(SUBMISSIONS_FILE);
    } catch {
        await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
    }
}

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const submission = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...req.body
        };

        const submissions = JSON.parse(await fs.readFile(SUBMISSIONS_FILE, 'utf-8'));
        submissions.push(submission);
        await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

        res.status(201).json({ message: 'Submission received successfully' });
    } catch (error) {
        console.error('Error handling submission:', error);
        res.status(500).json({ error: 'Failed to process submission' });
    }
});

// API endpoint to get all submissions (password protected)
app.get('/api/submissions', async (req, res) => {
    const adminPassword = req.headers['x-admin-password'];
    
    // Simple password protection (you should use proper authentication in production)
    if (adminPassword !== 'Abdul7860') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const submissions = JSON.parse(await fs.readFile(SUBMISSIONS_FILE, 'utf-8'));
        res.json(submissions);
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({ error: 'Failed to retrieve submissions' });
    }
});

// Admin dashboard route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Initialize and start the server
async function startServer() {
    await initializeSubmissionsFile();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
