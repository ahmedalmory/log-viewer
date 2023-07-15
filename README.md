# Log Viewer Web App

This is a web application to view a specific file under the server log directory and display at maximum 10 lines at a time.

## Requirements

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd log-viewer-app
```

2. Install the dependencies for the server:

```bash
cd server
npm install
```

3. Install the dependencies for the client:

```bash
cd ../client
npm install
```

## Usage

1. Start the server:

```bash
cd server
npm start
```

The server will be running at http://localhost:3000.

2. Open a new terminal and start the client:

```bash
cd client
npm start
```

The client will be accessible at http://localhost:8080.

1. Open your web browser and visit http://localhost:8080.

2. Login using the username and password: admin:admin.

3. Input the path to the log file (e.g., /var/log/example.log) in the input box and click the "Load" button.

4. The content of the log file will be displayed in the textarea with line numbers.

5. Use the navigation buttons to browse through the log file.

## Testing

To run the server-side unit tests, use the following command in the server directory:

```bash
npm test
```

## Notes

- The server uses the readline module to efficiently read large log files, ensuring that it doesn't exceed memory limits.
- This project is intended for learning purposes and may not be suitable for production use.