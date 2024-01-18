const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');
const messageController = require('./controllers/messageController');

const app = express();

// Connect db
mongoose.connect('mongodb+srv://ffurkanerdal:JvII8ObY78USy9P8@clean-blog.yhubg51.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
  console.log('DB Connected')
}).catch((err)=>{
  console.log(err)
})

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES

app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

app.get('/about.html', pageController.getAboutPage);

app.get('/post.html', pageController.getAddPage);

app.get('/contact.html', pageController.getContactPage);

app.get('/add_post.html', pageController.getAddPage);

app.post('/photos', photoController.createPhoto);

app.get('/edit-blog/:id', pageController.getEditPage);

app.put('/edit-blog-detail/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);


app.get('/messages', messageController.getMessages);

app.post('/messages',messageController.sendMessages)

app.delete('/messages/:id',messageController.deleteMessages)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
