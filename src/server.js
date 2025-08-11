
import { Env } from './config';
import App from './app.js';
import http from 'http'
import { testConnection } from './utils/database.js';


const app = new App()

var PORT = Env.PORT ;

const server = http.createServer(app.app);

// Test database connection before starting server
testConnection().then((isConnected) => {
    if (isConnected) {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } else {
        console.error('Failed to connect to database. Server not started.');
        process.exit(1);
    }
});

