const Photo = require('../models/Photo')
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
      photos,
    });
  }

  exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('post', {
      photo,
    });
  }

  exports.createPhoto =  async (req, res) => {

    const uploadDir = 'public/uploads';
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;
  
    uploadedImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      });
      res.redirect('/');
    });
  }


  exports.updatePhoto = async (req, res) => {
    try {
      const blog = await Photo.findById(req.params.id);
  
      if (req.files) {
        const photoDelete = async (rem_path) => {
          const image_path = `.//public${rem_path}`;
          try {
            await fs.promises.unlink(image_path);
            return true;
          } catch (err) {
            console.error(err);
            return false;
          }
        };
  
        if (await photoDelete(blog.image)) {
          const uploadedImage = req.files.image;
          const uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
  
          await uploadedImage.mv(uploadPath)
  
          blog.title = req.body.title;
          blog.description = req.body.description;
          blog.image = '/uploads/' + uploadedImage.name;
  
          await blog.save();

          res.redirect('index');
        } else {
          const uploadedImage = req.files.image;
          const uploadPath =  './/public/uploads/' + uploadedImage.name;
  
          await uploadedImage.mv(uploadPath)
  
          blog.title = req.body.title;
          blog.description = req.body.description;
          blog.image = '/uploads/' + uploadedImage.name;
  
          await blog.save();

          res.redirect('/');
        }
      } else {
        // IF !req.files
        blog.title = req.body.title;
        blog.description = req.body.description;
        blog.image = blog.image;
        await blog.save();

        await res.redirect('/')
  
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Sunucu hatası.');
    }
  }

  exports.deletePhoto = async (req, res) => {
    try {
      const blog = await Photo.findById(req.params.id);
  
      if (!blog) {
        await Photo.findByIdAndDelete(blog.id);
      }
  
      await fs.promises.unlink(`public/${blog.image}`);
  
      await Photo.findByIdAndDelete(blog.id);
  
      res.redirect('/');
    } catch (error) {
      const blog = await Photo.findById(req.params.id);

      console.error(error);
      await Photo.findByIdAndDelete(blog.id);
      res.redirect('/');
    }
  }