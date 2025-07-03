const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = 'AIzaSyC7ZDK4pBtudyj_3d1b0vpJOUE_BuyWtio';
const CX = '52339e54a4bcf453d';

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
        const sanitizedQuery = query.replace(/"/g, '&quot;');

        let html = `
      <!DOCTYPE html>
      <html lang="cs">
      <head>
        <meta charset="UTF-8" />
        <title>Výsledky hledání</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px auto;
            max-width: 700px;
            background: #121212;
            color: #f44336;
          }
          form {
            margin-bottom: 20px;
            display: flex;
          }
          input[name="query"] {
            flex-grow: 1;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #f44336;
            border-radius: 4px 0 0 4px;
            outline: none;
            background-color: #1f1f1f;
            color: #f9f9f9;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          input[name="query"]::placeholder {
            color: #ff8a80;
          }
          input[name="query"]:focus {
            border-color: #ff7961;
            box-shadow: 0 0 8px #ff7961;
          }
          button {
            padding: 10px 20px;
            background: #f44336;
            border: none;
            color: white;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            border-radius: 0 4px 4px 0;
            transition: background 0.3s ease, box-shadow 0.3s ease;
          }
          button:hover {
            background: #b71c1c;
            box-shadow: 0 0 10px #b71c1c;
          }
          h2 {
            margin-bottom: 15px;
            color: #f44336;
            text-shadow: 0 0 5px #f44336;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            background: #1f1f1f;
            margin-bottom: 12px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 1px 4px rgba(244, 67, 54, 0.4);
          }
          a {
            text-decoration: none;
            color: #ff8a80;
            font-size: 18px;
            font-weight: 600;
            transition: color 0.3s ease;
          }
          a:hover {
            color: #f44336;
            text-decoration: underline;
          }
          small {
            display: block;
            margin-top: 6px;
            color: #e57373;
            font-size: 14px;
          }
          #downloadBtn {
            margin-bottom: 20px;
            padding: 10px 20px;
            background: #d32f2f;
            border: none;
            color: white;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.3s ease, box-shadow 0.3s ease;
          }
          #downloadBtn:hover {
            background: #9a0007;
            box-shadow: 0 0 10px #9a0007;
          }
        </style>
      </head>
      <body>
        <form method="POST" action="/search">
          <input name="query" placeholder="Zadej hledaný výraz" value="${sanitizedQuery}" autocomplete="off" />
          <button type="submit">Hledat</button>
        </form>

        <h2>Výsledky hledání pro: ${sanitizedQuery}</h2>

        <button id="downloadBtn">Stáhnout výsledky (JSON)</button>

        <ul>
    `;

        for (const item of items) {
            html += `
        <li>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
          <small>${item.snippet}</small>
        </li>
      `;
        }

        html += `
        </ul>

        <script>
          const results = ${JSON.stringify(items)};

          document.getElementById('downloadBtn').addEventListener('click', () => {
            const dataStr = JSON.stringify(results, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'vysledky.json';
            a.click();

            URL.revokeObjectURL(url);
          });
        </script>
      </body>
      </html>
    `;

        res.send(html);
    } catch (error) {
        res.status(500).send('Chyba při získávání výsledků: ' + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
