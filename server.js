const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;


//  Serve static files from "public"
app.use(express.static('style'));

//  Serve HTML Pages
//main page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
//about us
app.get('/aboutUs', (req, res) => res.sendFile(path.join(__dirname, 'views', 'aboutUs.html')));
//meny
app.get('/meny', (req, res) => res.sendFile(path.join(__dirname, 'views', 'meny.html')));


//  Start the Server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
