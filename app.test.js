const request = require('supertest');
const app = require('./app');
const axios = require('axios');

jest.mock('axios');

describe('POST /search', () => {
    it('vrátí chybu 400, když není query', async () => {
        const res = await request(app).post('/search').send({ query: '' });
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('Zadej hledaný výraz!');
    });

    it('vrátí výsledky hledání (mockované)', async () => {     
        const fakeItems = [
            { title: 'Test 1', link: 'http://example.com/1', snippet: 'Snippet 1' },
            { title: 'Test 2', link: 'http://example.com/2', snippet: 'Snippet 2' },
        ];
        axios.get.mockResolvedValue({ data: { items: fakeItems } });

        const res = await request(app)
            .post('/search')
            .send({ query: 'něco' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ results: fakeItems });
    });

    it('vrátí chybu 500 při chybě axiosu', async () => {
        axios.get.mockRejectedValue(new Error('Externí chyba'));

        const res = await request(app)
            .post('/search')
            .send({ query: 'něco' });

        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Chyba při získávání výsledků:');
    });
});
