const express = require('express');
const path = require('path');
const ejs = require('ejs');
const photo = require('./models/Photo');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');

const app = express();

// Connect db
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTES

app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});


app.get('/about.html', (req, res) => {
  res.render('about');
});

app.get('/post.html',(req, res)=>{
  res.render('post')
})

app.get('/contact.html',(req, res)=>{
  res.render('contact')
})

app.get('/add_post.html',(req, res)=>{
  res.render('add_post')
})


app.post('/photos', async (req,res)=>{
  await Photo.create(req.body)  
  res.redirect('/')
})

app.get('/photos/:id', async (req, res)=>{
  const photo = await Photo.findById(req.params.id)
  res.render('post',{
    photo
  });
})


const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
