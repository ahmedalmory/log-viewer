const request = require('supertest');
const app = require('./index');

describe('Log Viewer App Tests', () => {
  test('GET /logs should return status 200', async () => {
    const response = await request(app).get('/logs');
    expect(response.status).toBe(200);
  });

  test('GET /logs should return the first 10 lines of the log file', async () => {
    const response = await request(app).get('/logs?path=./logs/example.log');
    const lines = response.text.split('\n');
    expect(lines.length).toBe(10);
  });

  test('GET /logs/linecount should return status 200', async () => {
    const response = await request(app).get('/logs/linecount');
    expect(response.status).toBe(200);
  });

  test('GET /logs/linecount should return the correct total number of lines in the log file', async () => {
    const response = await request(app).get('/logs/linecount?path=./logs/example.log');
    expect(response.body.lineCount).toBe(15); // Replace with the actual total lines count in the example.log
  });

  test('GET /logs with startLine greater than total lines should return empty content', async () => {
    const response = await request(app).get('/logs?path=./logs/example.log&startLine=100');
    expect(response.text).toBe('');
  });
});
