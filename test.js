const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcast-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// create a photo

// Photo.create({
//   title: 'Photo title 2',
//   description: 'Photo description 2 lorem ipsum dolor sit amet'
// })
//   .then(createdPhoto => {
//     console.log('Photo created successfully:', createdPhoto);
//   })
//   .catch(err => {
//     console.error('Error creating photo:', err);
//   });

// read a photo

// Photo.find({})
// .then(readedPhoto = (data) => {
//     console.log(data)
// }).catch(err =>{
//     console.log(err)
// })

// upgrade a photo

// const id = '65a31f1448a197c15aeed4d3';

// Photo.findByIdAndUpdate(id, 
// {
//   title: 'new new title is here!',
//   description: 'new new description is here!',
// },
// {
//     new : true
// }
// )
//   .then((upgradedPhoto = (data) => console.log(data)))
//   .catch((err => console.log(err)));



// Photo.findByIdAndDelete(id,)
// .then(deleted => console.log('photo is deleted'))
// .catch(err => console.log(err))

