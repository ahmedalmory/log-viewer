const fs = require('fs');
const express = require('express');
const basicAuth = require('express-basic-auth');
const readline = require('readline');

const app = express();
const port = 3000;

// Middleware to enforce basic authentication
app.use(
  basicAuth({
    users: { admin: 'admin' },
    challenge: true,
  })
);

// Serve static files from the 'client' directory
app.use(express.static('../client'));

// Function to get the total number of lines in a file
async function getTotalLines(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lineCount = 0;
  for await (const _ of rl) {
    lineCount++;
  }

  return lineCount;
}

// Route to handle fetching log file content
app.get('/logs', async (req, res) => {
  const filePath = req.query.path;
  let startLine = parseInt(req.query.startLine);
  const linesPerPage = 10;

  const totalLines = await getTotalLines(filePath);

  if (startLine >= totalLines) {
    startLine = Math.max(totalLines - linesPerPage, 0);
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentLine = 0;
  const lines = [];

  for await (const line of rl) {
    if (currentLine >= startLine && lines.length < linesPerPage) {
      lines.push(line);
    }

    currentLine++;

    if (lines.length === linesPerPage) {
      break;
    }
  }

  res.send(lines.join('\n'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
