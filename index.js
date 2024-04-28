const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Joshua Apostol API');
});

// Random GIF endpoint
app.get('/random-gif', (req, res) => {
  try {
    fs.readFile('random_gif.json', 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * jsonData.gifLinks.length);
      const randomGif = jsonData.gifLinks[randomIndex];
      res.send(`<img src="${randomGif}" alt="Random GIF">`);
    });
  } catch (error) {
    console.error('Error fetching random GIF:', error);
    res.status(500).json({ error: 'Error fetching random GIF' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
