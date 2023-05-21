const express = require('express');
const pa11y = require('pa11y');

const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.get('/testSite', async (req, res) => {
    const url = req.query.url;
    const result = await pa11y(url);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});