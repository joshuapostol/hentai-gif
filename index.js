const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Joshua Apostol API');
});

app.get('/random-gif', (req, res) => {
  try {
    fs.readFile('random_gif.json', 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * jsonData.gifLinks.length);
      const randomGif = jsonData.gifLinks[randomIndex];
      res.json({ gifLink: randomGif });
    });
  } catch (error) {
    console.error('Error fetching random GIF:', error);
    res.status(500).json({ error: 'Error fetching random GIF' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
