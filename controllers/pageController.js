const Photo = require('../models/Photo')
const fs = require('fs');


exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('post');
};

exports.getContactPage = (req, res) => {
  res.render('contact');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  const blog = await Photo.findById(req.params.id);
  res.render('edit', {
    blog,
  });
};
