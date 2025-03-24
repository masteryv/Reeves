
const PORT = 3000;
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

dotenv.config();

const dbService = require('./db_service');

app.use(cors()) //when we have an api datacall it wont block it  
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.set('view engine', 'ejs');









//  Serve static files from "public"
app.use(express.static('style'));

//  Serve HTML Pages
//main page
app.get('/', (req, res) => {
    console.log(req.session);

    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});
//about us
app.get('/aboutUs', (req, res) => res.sendFile(path.join(__dirname, 'views', 'aboutUs.html')));
//meny
app.get('/meny', (req, res) => res.sendFile(path.join(__dirname, 'views', 'meny.html')));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));

app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));
app.get('/admin', async function(req, res){
    const result = await dbService.getMenu("items", "price","ingredients");
    let data = {result}
    res.render('admin', data);
});

//registrera
app.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    console.log(name, email, password);
    try {
        const result = await dbService.addUser(name, email, password, phone);
        res.json({ message: 'User added successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
  });

  //  Login
  app.get('/register', async (req, res) => {
    console.log("hej")

    try {
        const users = await dbService.getUsers(); // Assuming getUsers() fetches all users
        res.json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }

});

// login page 
app.post('/login', async function (req,res) {
    console.log(req.session);
    req.session = {};
    console.log(req.session);
  let user = await dbService.getUser(req.body.email);
  if (await bcrypt.compare(req.body.password, user.password)){
      req.session.user = user.email;
      res.redirect("/admin");
  }else{
      res.render("login", {msg: "please try again"});
  }
  console.log(req.session.user);

});


app.get('/test', async function(req, res) {
    try {
        const result = await dbService.getMenu("items", "price","ingredients");
        res.send(result);

    } catch (error) {
        return res.status({message: error});
    }
})

// add menu 
app.post('/meny', async (req, res) => {
    const { items, price, ingredients } = req.body;
    console.log(items, price, ingredients)
    if (!items || !price || !ingredients ) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }
    console.log(items, price, ingredients);
    try {
        const result = await dbService.addMenu(items, price, ingredients);
        res.json({ message: 'Menu added successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
  });
  

//  Start the Server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
