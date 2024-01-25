const test = async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ message: 'Hello world!' });
};

module.exports = { 
    test, 
};