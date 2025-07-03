const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const API_KEY = '...';
const CX = '...';

app.get('/', (req, res) => {
    res.send(`<form method="POST" action="/search"><input name="query" placeholder="Zadej hledaný výraz" autocomplete="off" /><button type="submit">Hledat</button></form>`);
});

app.post('/search', async (req, res) => {
    const query = req.body.query?.trim();
    if (!query) {
        return res.status(400).send('Zadej hledaný výraz!');
    }
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: { key: API_KEY, cx: CX, q: query },
        });
        const items = response.data.items || [];
        res.json({ results: items });
    } catch (error) {
        res.status(500).send('Chyba při získávání výsledků: ' + error.message);
    }
});

module.exports = app;
