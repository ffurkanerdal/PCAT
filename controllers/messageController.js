const Message = require('../models/Message')

exports.getMessages = async (req,res) =>{
    const messageList = await Message.find()
    res.render('messages',{
        messageList
    })
}

exports.sendMessages = async (req,res) => {
    const message = Message.create({
        ...req.body
    })
    res.redirect('messages')
}

exports.deleteMessages = async (req, res) => {
    try {
        const msg = await Message.findByIdAndDelete(req.params.id);
        msg ? res.redirect('/messages') : res.redirect('/messages');
    } catch (error) {
        console.error('Delete error:', error);
        res.redirect('/messages'); // Hata durumunda da yönlendirme yapılabilir
    }
};