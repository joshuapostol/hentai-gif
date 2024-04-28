const express = require('express');
const { Brainly } = require("brainly-scraper-v2");
const app = express();
const port = 3000;

Brainly.initialize();
const brain = new Brainly("ph");

app.get('/brainly', async (req, res) => {
  try {
    const query = req.query.q;
    const countryCode = req.query.country || "ph";
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    let results = await brain.searchWithMT(query, countryCode);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No answer found. Please try another query.' });
    }

    let randomIndex = Math.floor(Math.random() * results.length);
    let randomAnswer = results[randomIndex].answers[0].content;
    
    const formattedAnswer = randomAnswer.replace(/<(?:.|\n)*?>/gm, ''); 

    res.json({ answer: formattedAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});