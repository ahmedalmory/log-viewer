let startLine = 0;
let totalLines = 0;

function loadLogFile() {
  const filePath = document.getElementById('filePath').value;
  startLine = 0;
  fetch(`/logs?path=${encodeURIComponent(filePath)}&startLine=${startLine}`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('logContent').value = data;
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching the log file');
    });
}

function goToStart() {
  startLine = 0;
  fetchLogFile();
}

function loadPreviousLines() {
  startLine = Math.max(startLine - 10, 0);
  fetchLogFile();
}

function loadNextLines() {
  startLine += 10;
  fetchLogFile();
}

function goToEnd() {
  startLine = Math.max(totalLines - 10, 0);
  fetchLogFile();
}

function fetchLogFile() {
  const filePath = document.getElementById('filePath').value;
  fetch(`/logs?path=${encodeURIComponent(filePath)}&startLine=${startLine}`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('logContent').value = data;
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching the log file');
    });
}

function fetchTotalLines() {
  const filePath = document.getElementById('filePath').value;
  fetch(`/logs/linecount?path=${encodeURIComponent(filePath)}`)
    .then(response => response.json())
    .then(data => {
      totalLines = data.lineCount;
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching the log file');
    });
}

document.getElementById('loadButton').addEventListener('click', () => {
  loadLogFile();
  fetchTotalLines();
});
document.getElementById('startButton').addEventListener('click', goToStart);
document.getElementById('previousButton').addEventListener('click', loadPreviousLines);
document.getElementById('nextButton').addEventListener('click', loadNextLines);
document.getElementById('endButton').addEventListener('click', goToEnd);
