require('dotenv').config();
    const express = require('express');
        const app = express();
        const port = process.env.PORT || 3000;

        app.use(express.json());

        app.get('/', (req, res) => {
            res.send('Hello, Express!');
        });

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });