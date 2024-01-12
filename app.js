const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// MIDDLEWARES

app.use(express.static('public'));

// ROUTES

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/index.html', (req, res) => {
  res.render('index');
});

app.get('/about.html', (req, res) => {
  res.render('about');
});

app.get('/post.html',(req, res)=>{
  res.render('post')
})

app.get('/add_post.html',(req, res)=>{
  res.render('add_post')
})


const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
