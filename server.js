const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Serve the files on port 3000.
app.listen(3000,  (error) => {
    if (error) {
        throw error;
    }
    console.log('App is listening on port 3000!\n');
});
